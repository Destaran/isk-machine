import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

interface EntityConstructor<T> {
  fromEntity(entity: any): T;
}

@Injectable()
export class DataScraper<T> {
  private baseUrl: string = 'https://esi.evetech.net/latest';
  private failedPages: object = {};
  private failedEntities: object = {};
  @Inject()
  private httpService: HttpService;

  constructor(
    private entity: EntityConstructor<T>,
    private pagination: boolean,
    private urlCategory: string,
    private urlEntity: string,
    private urlOptions: string,
    private repository: Repository<T>,
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
    console.log(`Fetching ${this.urlEntity} IDs on page ${pageNum}`);
    console.log(urlWithPageNum);
    try {
      const request = await firstValueFrom(
        this.httpService.get(urlWithPageNum),
      );
      console.log(`Fetched ${this.urlEntity} IDs on page ${pageNum}`);

      if (this.failedPages[pageNum]) {
        delete this.failedPages[pageNum];
      }
      return request;
    } catch (error) {
      console.log(
        `Failed to fetch ${this.urlEntity} IDs on page ${pageNum}:`,
        error.message,
      );
      this.failedPages[pageNum] = true;
      return null;
    }
  }

  async fetchPages(): Promise<number[]> {
    const firstPageRequest = await this.fetchPage(1);
    const pageCount = parseInt(firstPageRequest.headers['x-pages']);

    const requests = Array.from({ length: pageCount - 1 }, (_, i) => i + 2).map(
      (pageNum: number) => {
        console.log(
          `Fetching ${this.urlEntity} IDs on page ${pageNum}/${pageCount}`,
        );

        return this.fetchPage(pageNum);
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

  async fetchFailedPages(): Promise<number[]> {
    const failedPages = Object.keys(this.failedPages).map(Number);
    const requests = failedPages.map((pageNum) => {
      return this.fetchPage(pageNum);
    });

    const fetchedIds = await Promise.all(requests);
    return fetchedIds
      .filter((request) => request !== null)
      .map((request) => request.data)
      .flat();
  }

  async fetchIds(): Promise<any[]> {
    const url = [
      this.baseUrl,
      this.urlCategory,
      this.urlEntity,
      this.urlOptions,
    ].join('/');

    try {
      const request = await firstValueFrom(this.httpService.get(url));
      return request.data;
    } catch (error) {
      console.error(`Failed to fetch ${this.urlEntity} IDs:`, error.message);
      return [];
    }
  }

  async scrape(): Promise<void> {
    const now = new Date();
    console.log(`Scraping ${this.urlEntity}`);
    await this.repository.clear();
    this.failedPages = {};
    this.failedEntities = {};
    let entities = [];

    if (this.pagination) {
      const pages = await this.fetchPages();
      console.log(`Scraped ${pages.length} ${this.urlEntity} IDs`);

      if (Object.keys(this.failedPages).length > 0) {
        console.log(`Retrying ${Object.keys(this.failedPages).length} pages`);
        const failedPages = await this.fetchFailedPages();
        console.log(`Retrieved additional ${failedPages.length} IDs`);
        pages.push(...failedPages);
      }

      entities = await this.fetchEntities(pages);
      console.log(`Scraped ${entities.length} ${this.urlEntity}`);

      while (Object.keys(this.failedEntities).length > 0) {
        const additionalEntities = await this.fetchFailedEntities();
        console.log(
          `Retrieved additional ${additionalEntities.length} ${this.urlEntity}`,
        );
        entities.push(...additionalEntities);
      }
    } else {
      const ids = await this.fetchIds();
      console.log(`Scraped ${ids.length} ${this.urlEntity} IDs`);
      entities = await this.fetchEntities(ids);
      console.log(`Scraped ${entities.length} ${this.urlEntity}`);
    }
    await this.saveEntities(entities);
    const count = await this.repository.count();
    const then = new Date();
    const elapsed = ((then.getTime() - now.getTime()) / 1000).toFixed(2);
    console.log(`Scraped ${count} ${this.urlEntity} in ${elapsed}s`);
  }

  async fetchFailedEntities(): Promise<number[]> {
    const failedEntities = Object.keys(this.failedEntities).map(Number);
    const fetchedEntities = await this.fetchEntities(failedEntities);
    return fetchedEntities
      .map((entity) => entity.id)
      .filter((entity) => entity !== null);
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
      console.log(`Fetching ${this.urlEntity} ${id}`);
      console.log(url);
      const request = await firstValueFrom(this.httpService.get(url));
      console.log(`Successfully fetched ${this.urlEntity} ${id}`);
      return request.data;
    } catch (error) {
      console.log(`Failed to fetch ${this.urlEntity} ${id}`);
      console.log(error.message);

      this.failedEntities[id] = true;
      return null;
    }
  }

  async fetchEntities(ids: number[]): Promise<any[]> {
    const entities = ids.map((id) => this.fetchEntity(id));
    const fetchedEntities = await Promise.all(entities);
    return fetchedEntities.filter((entity) => entity !== null);
  }

  async saveEntities(scrapedEntities: T[]): Promise<void> {
    const entities: T[] = [];
    for (const scrapedEntity of scrapedEntities) {
      const newEntity = this.entity.fromEntity(scrapedEntity);
      entities.push(newEntity);
    }
    await this.repository.save(entities);
  }
}
