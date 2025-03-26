import { Injectable } from '@nestjs/common';
import { StationRepository } from './station.repository';
import { SystemService } from 'src/system/system.service';
import { Station } from './station.entity';
import { In } from 'typeorm';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { SmartUrl } from 'src/data-scraper/smart-url';

@Injectable()
export class StationService {
  constructor(
    private readonly stationRepository: StationRepository,
    private readonly systemService: SystemService,
    private readonly dataScraper: DataScraper,
  ) {}

  async wipe() {
    await this.stationRepository.clear();
  }

  async scrape() {
    const systemSmartUrl = new SmartUrl(
      'universe',
      'systems',
      '?datasource=tranquility',
    );

    const stationIds = [];
    const systemids = await this.systemService.getAllSystemIds();
    console.log(`Scraping stations for ${systemids.length} systems`);
    const chunkedSystemIds = this.dataScraper.chunk(systemids, 1000);

    for (const systemIdsChunk of chunkedSystemIds) {
      const fetchedSystems = await this.dataScraper.fetchEntities(
        systemSmartUrl,
        systemIdsChunk,
      );
      const chunkStationIds = fetchedSystems
        .map((system) => system.stations)
        .filter((stations) => stations !== undefined)
        .flat();

      stationIds.push(...chunkStationIds);
    }

    const stationSmartUrl = new SmartUrl(
      'universe',
      'stations',
      '?datasource=tranquility',
    );
    const chunkedStationIds = this.dataScraper.chunk(stationIds, 1000);
    const all = [];

    for (const chunk of chunkedStationIds) {
      const stations = await this.dataScraper.fetchEntities(
        stationSmartUrl,
        chunk,
      );
      const stationEntities = stations.map((station) =>
        Station.fromEntity(station),
      );
      const saved = await this.stationRepository.upsert(stationEntities, [
        'id',
      ]);
      all.push(...saved.identifiers);
      console.log(`Scraped ${saved.identifiers.length} stations`);
    }
    console.log(`Scraped ${all.length} stations in total`);
  }

  async getByIds(ids: number[]) {
    return await this.stationRepository.find({ where: { id: In(ids) } });
  }

  async getById(id: number) {
    return await this.stationRepository.findOne({ where: { id } });
  }
}
