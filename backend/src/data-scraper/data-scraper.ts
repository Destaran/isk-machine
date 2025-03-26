import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { SmartUrl } from './smart-url';

@Injectable()
export class DataScraper {
  private baseUrl: string = 'https://esi.evetech.net/latest';

  constructor(private httpService: HttpService) {}

  chunk<T>(array: T[], size: number): T[][] {
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
    return (await firstValueFrom(this.httpService.get(url))).data;
  }

  async fetchEntities(smartUrl: SmartUrl, ids: number[]): Promise<any[]> {
    const entities = ids.map((id) => this.fetchEntity(smartUrl, id));
    const fetchedEntities = await Promise.all(entities);
    return fetchedEntities.filter((entity) => entity !== null);
  }
}
