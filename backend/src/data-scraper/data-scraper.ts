import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { SmartUrl } from './smart-url';

@Injectable()
export class DataScraper {
  private readonly failedIds: number[] = [];
  constructor(private httpService: HttpService) {}

  chunk<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size),
    );
  }

  async fetchFromPage(
    smartUrl: SmartUrl,
    pageNum: number,
  ): Promise<AxiosResponse<any, any>> {
    const urlWithPageNum = smartUrl.getUrlForPage(pageNum);
    const request = await firstValueFrom(this.httpService.get(urlWithPageNum), {
      defaultValue: null,
    });

    return request;
  }

  async fetchAllPages(smartUrl: SmartUrl): Promise<any[]> {
    const firstPageRequest = await this.fetchFromPage(smartUrl, 1);
    const pageCount = parseInt(firstPageRequest.headers['x-pages']);

    const requests = Array.from({ length: pageCount - 1 }, (_, i) => i + 2).map(
      (pageNum: number) => {
        console.log(`Fetching page ${pageNum}/${pageCount}`);

        return this.fetchFromPage(smartUrl, pageNum);
      },
    );
    const fetchedIds = await Promise.all(requests);
    return [
      ...firstPageRequest.data,
      ...fetchedIds
        .filter((request) => request !== null && request.data !== null)
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
    const request = await firstValueFrom(this.httpService.get(url), {
      defaultValue: null,
    });
    if (request.data === null) {
      this.failedIds.push(id);
    }
    return request.data;
  }

  async fetchEntities(smartUrl: SmartUrl, ids: number[]): Promise<any[]> {
    const entities = ids.map((id) => this.fetchEntity(smartUrl, id));
    const fetchedEntities = await Promise.all(entities);
    return fetchedEntities.filter((entity) => entity !== null);
  }

  async logFailedIds() {
    if (this.failedIds.length > 0) {
      console.error(
        `Failed to fetch entities for IDs: ${this.failedIds.join(', ')}`,
      );
    } else {
      console.log('All entities fetched successfully.');
    }
  }
}
