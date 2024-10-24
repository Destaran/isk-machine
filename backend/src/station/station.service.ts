import { Injectable } from '@nestjs/common';
import { StationRepository } from './station.repository';
import { HttpService } from '@nestjs/axios';
import { SystemService } from 'src/system/system.service';
import { firstValueFrom } from 'rxjs';
import { Station } from './station.entity';
import { In } from 'typeorm';

@Injectable()
export class StationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly stationRepository: StationRepository,
    private readonly systemService: SystemService,
  ) {}

  async wipe() {
    await this.stationRepository.clear();
  }

  async scrape() {
    this.wipe();

    const allSystemIds = await this.systemService.getAllSystemIds();

    for (const systemId of allSystemIds) {
      const systemUrl = `https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility`;

      const systemRequest = await firstValueFrom(
        this.httpService.get(systemUrl),
      );

      const systemStationsIds = systemRequest.data.stations;
      const systemStations = [];

      if (!systemStationsIds) {
        console.log(`No stations found for system ${systemRequest.data.name}.`);
        continue;
      }
      for (const stationId of systemStationsIds) {
        const stationUrl = `https://esi.evetech.net/latest/universe/stations/${stationId}/?datasource=tranquility`;

        const stationRequest = await firstValueFrom(
          this.httpService.get(stationUrl),
        );

        const scrapedStation = stationRequest.data;

        const station = new Station();
        station.id = scrapedStation.station_id;
        station.name = scrapedStation.name;
        station.owner_id = scrapedStation.owner;
        station.system_id = Number(systemId);
        station.type_id = scrapedStation.type_id;
        station.max_dockable_ship_volume =
          scrapedStation.max_dockable_ship_volume;
        station.office_rental_cost = scrapedStation.office_rental_cost;
        station.race_id = scrapedStation.race_id;
        station.reprocessing_efficiency =
          scrapedStation.reprocessing_efficiency;
        station.reprocessing_stations_take =
          scrapedStation.reprocessing_stations_take;
        station.services = scrapedStation.services;

        systemStations.push(station);
      }

      await this.stationRepository.save(systemStations);
      console.log(
        `Saved ${systemStations.length} stations for system ${systemRequest.data.name}.`,
      );
    }
    const stationsCount = await this.stationRepository.count();
    console.log(`Saved ${stationsCount} stations to database.`);
  }

  async getByIds(ids: number[]) {
    return await this.stationRepository.find({ where: { id: In(ids) } });
  }
}
