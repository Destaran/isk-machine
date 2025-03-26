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
    const systems = await this.dataScraper.fetchEntities(smartUrl, ids);
    const systemEntities = systems.map((system) => System.fromEntity(system));
    const saved = await this.systemRepository.upsert(systemEntities, ['id']);
    console.log(`Scraped ${saved.identifiers.length} systems`);
  }

  async getByIds(ids: number[]) {
    return await this.systemRepository.find({ where: { id: In(ids) } });
  }

  async getAllSystemIds() {
    const stations = await this.systemRepository.find({ select: ['id'] });
    return stations.map((region) => Number(region.id));
  }
}
