import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class DataScraper<T> {
  private baseUrl: string = 'https://esi.evetech.net/latest';

  constructor(
    private entity: new () => T,
    private pagination: boolean,
    private urlCategory: string,
    private urlEntity: string,
    private urlOptions: string,
    private failedPages: object = {},
    private readonly httpService: HttpService,
    private readonly repository: Repository<T>,
  ) {
    this.pagination = pagination;
    this.urlCategory = urlCategory;
    this.urlEntity = urlEntity;
    this.urlOptions = urlOptions;
  }

  async fetchPage(pageNum: number): Promise<AxiosResponse<any, any>> {
    const url = [
      this.baseUrl,
      this.urlCategory,
      this.urlEntity,
      this.urlOptions,
    ].join('/');
    const urlWithPageNum = `${url}&page=${pageNum}`;
    try {
      const request = await firstValueFrom(
        this.httpService.get(urlWithPageNum),
      );
      return request;
    } catch (error) {
      console.error(`Failed to fetch ${this.urlEntity} IDs:`, error.message);
      this.failedPages[pageNum] = true;
      return null;
    }
  }

  async fetchIds(): Promise<number[]> {
    let request: AxiosResponse<any, any>;

    if (this.pagination) {
      const firstPageRequest = await this.fetchPage(1);
      const pageCount = parseInt(firstPageRequest.headers['x-pages']);
      const requests = Array.from(
        { length: pageCount - 1 },
        (_, i) => i + 2,
      ).map((pageNum: number) => {
        return this.fetchPage(pageNum);
      });

      const fetchedIds = await Promise.all(requests);
      return [
        ...firstPageRequest.data,
        ...fetchedIds
          .filter((request) => request !== null)
          .map((request) => request.data)
          .flat(),
      ];
    }

    const url = [
      this.baseUrl,
      this.urlCategory,
      this.urlEntity,
      this.urlOptions,
    ].join('/');

    try {
      request = await firstValueFrom(this.httpService.get(url));
    } catch (error) {
      console.error(`Failed to fetch ${this.urlEntity} IDs:`, error.message);
      return [];
    }

    return request.data;
  }

  async fetchEntity(id: number): Promise<any> | null {
    const url = [
      this.baseUrl,
      this.urlCategory,
      this.urlEntity,
      id,
      this.urlOptions,
    ].join('/');
    try {
      const request = await firstValueFrom(this.httpService.get(url));
      return request.data;
    } catch (error) {
      console.log(`Failed to fetch ${this.urlEntity} ${id}`);
      console.log(error.message);
      return null;
    }
  }

  async fetchEntities(ids: number[]): Promise<any[]> {
    const entities = ids.map((id) => this.fetchEntity(id));
    const fetchedEntities = await Promise.all(entities);
    return fetchedEntities.filter((entity) => entity !== null);
  }

  async saveEntities(scrapedEntities: T[]): Promise<void> {
    const entities = [];
    for (const scrapedEntity of scrapedEntities) {
      const newEntity = new this.entity();
      Object.assign(newEntity, scrapedEntity);
      entities.push(newEntity);
    }
    await this.repository.save(entities);
  }
}
