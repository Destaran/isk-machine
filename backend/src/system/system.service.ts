import { Injectable } from '@nestjs/common';
import { SystemRepository } from './system.repository';
import { System } from './system.entity';
import { In } from 'typeorm';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { SmartUrl } from 'src/data-scraper/smart-url';

@Injectable()
export class SystemService {
  constructor(
    private readonly systemRepository: SystemRepository,
    private readonly dataScraper: DataScraper,
  ) {}

  async wipe() {
    await this.systemRepository.clear();
  }

  async scrape() {
    const smartUrl = new SmartUrl(
      'universe',
      'systems',
      '?datasource=tranquility',
    );
    const ids = await this.dataScraper.fetchIds(smartUrl);
    const chunkedIds = this.dataScraper.chunk(ids, 1000);
    const all = [];
    for (const ids of chunkedIds) {
      const entities = await this.dataScraper.fetchEntities(smartUrl, ids);
      const systemEntities = entities.map((entity) =>
        System.fromEntity(entity),
      );
      const saved = await this.systemRepository.upsert(systemEntities, ['id']);
      all.push(...saved.identifiers);
      console.log(`Scraped ${saved.identifiers.length} systems`);
    }
    console.log(`Scraped ${all.length} systems in total`);
  }

  async getByIds(ids: number[]) {
    return await this.systemRepository.find({ where: { id: In(ids) } });
  }

  async getById(id: number) {
    return await this.systemRepository.findOne({ where: { id } });
  }

  async getAllSystemIds() {
    const stations = await this.systemRepository.find({ select: ['id'] });
    return stations.map((region) => Number(region.id));
  }
}
