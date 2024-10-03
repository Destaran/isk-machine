import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegionService } from 'src/region/region.service';
import { SystemService } from 'src/system/system.service';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class DataScraperService {
  private currentRegionId: number | null = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly regionService: RegionService,
    private readonly systemService: SystemService,
    private readonly ordersService: OrdersService,
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

  async scrapeType(typeId: number) {
    const typeUrl = `https://esi.evetech.net/latest/universe/types/${typeId}/?datasource=tranquility`;

    const typeRequest = await firstValueFrom(this.httpService.get(typeUrl));

    if (typeRequest.status === 200) {
      console.log(`Scraped type ${typeId}.`);
    }

    return typeRequest.data;
  }

  async scrapeAllRegionOrders(regionId: number) {
    this.ordersService.scrapeAllRegionOrders(regionId);
  }

  async scrapeAllRegionsAllOrders() {
    this.ordersService.scrapeAllRegionsAllOrders();
  }

  async continueAllRegionsAllOrders(regionId: number = this.currentRegionId) {
    this.ordersService.continueAllRegionsAllOrders(regionId);
  }

  async getOrdersTotal() {
    return this.ordersService.getOrdersTotal();
  }

  async wipeAllOrders() {
    this.ordersService.wipeAllOrders();
  }

  async wipeRegionOrders(regionId: number) {
    this.ordersService.wipeRegionOrders(regionId);
  }
}
