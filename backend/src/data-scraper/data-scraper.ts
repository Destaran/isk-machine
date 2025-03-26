import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { SmartUrl } from './smart-url';

@Injectable()
export class DataScraper {
  private baseUrl: string = 'https://esi.evetech.net/latest';

  constructor(private httpService: HttpService) {}

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async chunk(array: any[], size: number): Promise<any[]> {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size),
    );
  }

  async fetchIdsFromPage(
    smartUrl: SmartUrl,
    pageNum: number,
  ): Promise<AxiosResponse<any, any>> {
    const urlWithPageNum = smartUrl.getUrlForPage(pageNum);
    console.log(`Fetching IDs on page ${pageNum}`);
    const request = await firstValueFrom(this.httpService.get(urlWithPageNum));

    return request;
  }

  async fetchIdsFromAllPages(smartUrl: SmartUrl): Promise<number[]> {
    const firstPageRequest = await this.fetchIdsFromPage(smartUrl, 1);
    const pageCount = parseInt(firstPageRequest.headers['x-pages']);

    const requests = Array.from({ length: pageCount - 1 }, (_, i) => i + 2).map(
      (pageNum: number) => {
        console.log(`Fetching IDs on page ${pageNum}/${pageCount}`);

        return this.fetchIdsFromPage(smartUrl, pageNum);
      },
    );
    const fetchedIds = await Promise.all(requests);
    return [
      ...firstPageRequest.data,
      ...fetchedIds
        .filter((request) => request !== null)
        .map((request) => request.data)
        .flat(),
    ];
  }

  async fetchIds(smartUrl: SmartUrl): Promise<number[]> {
    try {
      const url = smartUrl.getUrlForAll();
      const request = await firstValueFrom(this.httpService.get(url));
      console.log(
        `Fetched ${request.data.length} IDs for ${smartUrl.urlEntity}`,
      );
      return request.data;
    } catch (error) {
      console.error(`Failed to fetch IDs:`, error.message);
      return [];
    }
  }

  async fetchEntity(smartUrl: SmartUrl, id: number): Promise<any> | null {
    const url = smartUrl.getUrlForId(id);
    console.log(`Fetch ${smartUrl.urlEntity} ${id}`);
    const delay = 5000;

    while (true) {
      try {
        const request = await firstValueFrom(this.httpService.get(url));
        return request.data;
      } catch (error) {
        console.log(`Failed to fetch ${id}:`, error.message);

        if (
          error.response &&
          Number(error.response.headers['x-esi-error-limit-remain']) > 0
        ) {
          console.log(`Retrying after ${delay / 1000} seconds...`);
          await this.sleep(delay);
          return await this.fetchEntity(smartUrl, id);
        } else if (
          error.response &&
          Number(error.response.headers['x-esi-error-limit-remain']) <= 0
        ) {
          console.error(`Rate limit exceeded for entity ${id}.`);
          const apiDelay =
            Number(error.response.headers['x-esi-error-limit-reset']) * 1000;
          await this.sleep(apiDelay);
          return await this.fetchEntity(smartUrl, id);
        } else {
          console.error(
            `Non-retryable error for entity ${id}:`,
            error.response?.status,
          );
          break;
        }
      }
    }

    console.error(`Failed to fetch entity ${id}.`);
    return null; // Return null if all retries fail
  }

  async fetchEntities(smartUrl: SmartUrl, ids: number[]): Promise<any[]> {
    const entities = ids.map((id) => this.fetchEntity(smartUrl, id));
    const fetchedEntities = await Promise.all(entities);
    return fetchedEntities.filter((entity) => entity !== null);
  }
}
