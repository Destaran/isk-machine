import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Region } from 'src/region/region.entity';
import { RegionRepository } from 'src/region/region.repository';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

@Injectable()
export class RegionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly regionRepository: RegionRepository,
  ) {}

  async wipe() {
    await this.regionRepository.clear();
  }

  async scrape() {
    this.wipe();
    const regionIdsUrl =
      'https://esi.evetech.net/latest/universe/regions/?datasource=tranquility';

    const regionIdsRequest = await firstValueFrom(
      this.httpService.get(regionIdsUrl),
    );

    const regionIds = regionIdsRequest.data;

    if (regionIdsRequest.status === 200) {
      console.log(`Scraped ${regionIds.length} regions.`);
    }

    for (const regionId of regionIds) {
      const regionUrl = `https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility`;

      const regionRequest = await firstValueFrom(
        this.httpService.get(regionUrl),
      );

      if (regionRequest.status === 200) {
        console.log(`Scraped region ${regionId}.`);
      }

      const scrapedRegion = regionRequest.data;

      const region = new Region();
      region.id = scrapedRegion.region_id;
      region.name = scrapedRegion.name;
      region.description = scrapedRegion.description;
      await this.regionRepository.save(region);
    }
    console.log(`Saved ${regionIds.length} regions.`);
  }

  async getRegions() {
    return await this.regionRepository.find();
  }

  async getOneBy(options: FindOptionsWhere<Region>) {
    return await this.regionRepository.findOneBy(options);
  }

  async getManyBy(options: FindManyOptions<Region>) {
    return await this.regionRepository.find(options);
  }
}
