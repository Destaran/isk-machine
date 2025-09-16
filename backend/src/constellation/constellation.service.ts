import { Injectable } from '@nestjs/common';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { ConstellationRepository } from './constellation.repository';
import { SmartUrl } from 'src/data-scraper/smart-url';
import { Constellation } from './constellation.entity';

@Injectable()
export class ConstellationService {
  constructor(
    private readonly constellationRepository: ConstellationRepository,
    private readonly dataScraper: DataScraper,
  ) {}

    async wipe() {
        await this.constellationRepository.clear();
    }

    async scrape() {
      const smartUrl = new SmartUrl(
        'universe',
        'constellations',
        '?datasource=tranquility',
      );
      const ids = await this.dataScraper.fetchIds(smartUrl);
      const chunkedIds = this.dataScraper.chunk(ids, 1000);
      const all = [];
      for (const ids of chunkedIds) {
        const entities = await this.dataScraper.fetchEntities(smartUrl, ids);
        const constellationEntities = entities.map((entity) =>
          Constellation.fromEntity(entity),
        );
        const saved = await this.constellationRepository.upsert(constellationEntities, ['id']);
        all.push(...saved.identifiers);
        console.log(`Scraped ${saved.identifiers.length} constellations`);
      }
      console.log(`Scraped ${all.length} constellations in total`);
    }
}
