import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Region } from 'src/region/region.entity';
import { RegionRepository } from 'src/region/region.repository';
import { In } from 'typeorm';

@Injectable()
export class RegionService {
  private failedRegionIds: object = {};
  constructor(
    private readonly httpService: HttpService,
    private readonly regionRepository: RegionRepository,
  ) {}

  async fetchRegionIds(): Promise<number[]> {
    const regionIdsUrl =
      'https://esi.evetech.net/latest/universe/regions/?datasource=tranquility';

    try {
      const regionIdsRequest = await firstValueFrom(
        this.httpService.get(regionIdsUrl),
      );
      return regionIdsRequest.data;
    } catch (error) {
      console.error('Failed to fetch region IDs:', error.message);
      return [];
    }
  }

  async fetchRegion(regionId: number): Promise<any> | null {
    const regionUrl = `https://esi.evetech.net/latest/universe/regions/${regionId}/?datasource=tranquility`;

    try {
      const regionRequest = await firstValueFrom(
        this.httpService.get(regionUrl),
      );
      return regionRequest.data;
    } catch (error) {
      console.log(`Failed to fetch region ${regionId}`);
      console.log(error.message);
      this.failedRegionIds[regionId] = true;
      return null;
    }
  }

  async fetchRegions(regionIds: number[]): Promise<any[]> {
    const regions = regionIds.map((regionId) => this.fetchRegion(regionId));
    const fetchedRegions = await Promise.all(regions);
    return fetchedRegions.filter((region) => region !== null);
  }

  async saveRegions(regions: any[]) {
    const regionsEntities = [];

    for (const region of regions) {
      const regionEntity = new Region();
      regionEntity.id = region.region_id;
      regionEntity.name = region.name;
      regionEntity.description = region.description;

      regionsEntities.push(regionEntity);

      if (this.failedRegionIds[region.region_id]) {
        delete this.failedRegionIds[region.region_id];
      }
    }

    await this.regionRepository.save(regionsEntities);
  }

  async scrape() {
    await this.regionRepository.clear();
    this.failedRegionIds = {};

    const regionIds = await this.fetchRegionIds();
    const regions = await this.fetchRegions(regionIds);
    await this.saveRegions(regions);

    const failedRegionIds = Object.keys(this.failedRegionIds).map(Number);
    while (failedRegionIds.length > 0) {
      const regions = await this.fetchRegions(failedRegionIds);
      await this.saveRegions(regions);
    }

    const count = await this.regionRepository.count();
    console.log(`Scraped ${count} regions`);
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
