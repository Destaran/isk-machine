import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegionService } from 'src/region/region.service';
import { SystemService } from 'src/system/system.service';
import { OrdersService } from 'src/orders/orders.service';
import { TypesService } from 'src/type/types.service';
import { MetadataService } from 'src/metadata/metadata.service';
import { StationService } from 'src/station/station.service';
import { StructureService } from 'src/structure/structure.service';

@Injectable()
export class DataScraperService {
  private currentRegionId: number | null = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly regionService: RegionService,
    private readonly systemService: SystemService,
    private readonly ordersService: OrdersService,
    private readonly typeService: TypesService,
    private readonly metadataService: MetadataService,
    private readonly stationService: StationService,
    private readonly structureService: StructureService,
  ) {}

  async postNames(ids: number[]) {
    const namesUrl =
      'https://esi.evetech.net/latest/universe/names/?datasource=tranquility';
    const response = await firstValueFrom(this.httpService.post(namesUrl, ids));
    if (response.status === 200) {
      console.log(`Scraped ${response.data.length} names.`);
    }
    return response.data;
  }

  async scrapeRegions() {
    this.regionService.scrape();
  }

  async wipeRegions() {
    this.regionService.wipe();
  }

  async scrapeSystems() {
    this.systemService.scrape();
  }

  async wipeSystems() {
    this.systemService.wipe();
  }

  async scrapeAllRegionOrders(regionId: number) {
    this.ordersService.scrapeRegion(regionId);
  }

  async scrapeAllRegionsAllOrders() {
    const endDate = await this.ordersService.scrapeAll();
    this.metadataService.updateScrapeDate(endDate);
  }

  async getOrdersTotal() {
    return this.ordersService.getTotal();
  }

  async wipeAllOrders() {
    this.ordersService.wipeAll();
  }

  async wipeRegionOrders(regionId: number) {
    this.ordersService.wipeRegion(regionId);
  }

  async scrapeAllTypes() {
    this.typeService.scrapeAll();
  }

  async wipeAllStations() {
    this.stationService.wipe();
  }

  async scrapeAllStations() {
    this.stationService.scrape();
  }

  async wipeAllStructures() {
    this.structureService.wipe();
  }

  async scrapeAllStructures() {
    this.structureService.scrape();
  }
}
