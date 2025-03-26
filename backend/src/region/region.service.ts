import { Injectable } from '@nestjs/common';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { SmartUrl } from 'src/data-scraper/smart-url';
import { Region } from 'src/region/region.entity';
import { RegionRepository } from 'src/region/region.repository';
import { In } from 'typeorm';

@Injectable()
export class RegionService {
  constructor(
    private readonly regionRepository: RegionRepository,
    private readonly dataScraper: DataScraper,
  ) {}

  async scrape() {
    const smartUrl = new SmartUrl(
      'universe',
      'regions',
      '?datasource=tranquility',
    );
    const ids = await this.dataScraper.fetchIds(smartUrl);
    const regions = await this.dataScraper.fetchEntities(smartUrl, ids);
    const regionsEntities = regions.map((region) => Region.fromEntity(region));

    await this.regionRepository.upsert(regionsEntities, ['id']);
    console.log(`Scraped ${regions.length} regions`);
  }

  async getRegions() {
    return await this.regionRepository.find();
  }

  async getRegionIds() {
    const regions = await this.regionRepository.find({ select: ['id'] });
    return regions.map((region) => Number(region.id));
  }

  async getByIds(ids: number[]) {
    return await this.regionRepository.find({ where: { id: In(ids) } });
  }
}
