import { Injectable } from '@nestjs/common';
import { StationRepository } from './station.repository';
import { SystemService } from 'src/system/system.service';
import { Station } from './station.entity';
import { In } from 'typeorm';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { SmartUrl } from 'src/data-scraper/smart-url';
import { ConstellationService } from 'src/constellation/constellation.service';

@Injectable()
export class StationService {
  constructor(
    private readonly stationRepository: StationRepository,
    private readonly systemService: SystemService,
    private readonly constellationService: ConstellationService,
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
    const chunkedSystemIds = this.dataScraper.chunk(systemids, 500);

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
    const chunkedStationIds = this.dataScraper.chunk(stationIds, 500);
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

  async getRegionIdByStationId(stationId: number) {
    const systemId = await this.getById(stationId).then((station) => station?.system_id);

    if (!systemId) {
      throw new Error(`Station with id ${stationId} not found`);
    }

    const constellationId = await this.systemService
      .getById(systemId)
      .then((system) => system?.constellation_id);

    if (!constellationId) {
      throw new Error(`System with id ${systemId} not found`);
    }

    const regionId = await this.constellationService
      .getById(constellationId)
      .then((constellation) => constellation?.region_id);

    if (!regionId) {
      throw new Error(
        `Constellation with id ${constellationId} not found`,
      );
    }

    return regionId;
  }
}
