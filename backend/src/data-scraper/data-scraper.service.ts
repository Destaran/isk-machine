import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegionRepository } from './region.repository';
import { Region } from './region.entity';

@Injectable()
export class DataScraperService {
  constructor(
    private readonly httpService: HttpService,
    private readonly regionRepository: RegionRepository,
  ) {}

  async getNames(ids: number[]) {
    const namesUrl =
      'https://esi.evetech.net/latest/universe/names/?datasource=tranquility';
    const response = await firstValueFrom(this.httpService.post(namesUrl, ids));
    return response.data;
  }

  async scrapeRegions() {
    const regionIdsUrl =
      'https://esi.evetech.net/latest/universe/regions/?datasource=tranquility';

    const regionIds = await firstValueFrom(this.httpService.get(regionIdsUrl));

    if (regionIds.status === 200) {
      console.log(`Scraped ${regionIds.data.length} regions.`);
    }

    if (regionIds.status !== 200) {
      console.error('Failed to scrape regions.');
      return;
    }

    const regionsWithNames = await this.getNames(regionIds.data);

    if (regionsWithNames.status === 200) {
      console.log(
        `Scraped ${regionsWithNames.data.length} regions with names.`,
        regionsWithNames.status,
      );
    }

    if (regionsWithNames.status !== 200) {
      console.error('Failed to scrape regions with names.');
      return;
    }

    for (const regionWithName of regionsWithNames) {
      const region = new Region();
      region.id = regionWithName.id;
      region.name = regionWithName.name;
      await this.regionRepository.save(region);
    }
  }
}
