import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegionRepository } from './region.repository';
import { Region } from './region.entity';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { MoreThanOrEqual } from 'typeorm';
import { System } from './system.entity';
import { SystemRepository } from './system.repository';

@Injectable()
export class DataScraperService {
  private currentRegionId: number | null = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly regionRepository: RegionRepository,
    private readonly orderRepository: OrderRepository,
    private readonly systemRepository: SystemRepository,
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
    const regionIdsUrl =
      'https://esi.evetech.net/latest/universe/regions/?datasource=tranquility';

    const regionIdsRequest = await firstValueFrom(
      this.httpService.get(regionIdsUrl),
    );

    const regionIds = regionIdsRequest.data;

    if (regionIdsRequest.status === 200) {
      console.log(`Scraped ${regionIds.length} regions.`);
    }

    const regionsWithNames = await this.postNames(regionIds);

    for (const regionWithName of regionsWithNames) {
      const region = new Region();
      region.id = regionWithName.id;
      region.name = regionWithName.name;
      await this.regionRepository.save(region);
    }
  }

  async wipeRegions() {
    await this.regionRepository.clear();
  }

  async scrapeSystems() {
    const systemsUrl =
      'https://esi.evetech.net/latest/universe/systems/?datasource=tranquility';

    const systemIdsRequest = await firstValueFrom(
      this.httpService.get(systemsUrl),
    );

    if (systemIdsRequest.status === 200) {
      console.log(`Scraped ${systemIdsRequest.data.length} systems.`);
    }

    systemIdsRequest.data.forEach(async (systemId: number) => {
      const systemUrl = `https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility`;

      const systemRequest = await firstValueFrom(
        this.httpService.get(systemUrl),
      );

      if (systemRequest.status === 200) {
        console.log(`Scraped system ${systemId}.`);
      }

      const scrapedSystem = systemRequest.data;

      const system = new System();
      system.id = scrapedSystem.system_id;
      system.name = scrapedSystem.name;
      system.security_status = Number(scrapedSystem.security_status.toFixed(2));
      this.systemRepository.save(system);
    });
  }

  async wipeSystems() {
    await this.systemRepository.clear();
  }

  async scrapeType(typeId: number) {
    const typeUrl = `https://esi.evetech.net/latest/universe/types/${typeId}/?datasource=tranquility`;

    const typeRequest = await firstValueFrom(this.httpService.get(typeUrl));

    if (typeRequest.status === 200) {
      console.log(`Scraped type ${typeId}.`);
    }

    return typeRequest.data;
  }

  async getRegionOrders(regionId: number, pageNum: number = 1) {
    const regionOrdersUrl = `https://esi.evetech.net/latest/markets/${regionId}/orders/?datasource=tranquility&order_type=all&page=${pageNum}`;

    const regionOrdersRequest = await firstValueFrom(
      this.httpService.get(regionOrdersUrl, {
        validateStatus: (status) => {
          return status === 200 || status === 404 || status === 504;
        },
      }),
    );

    return regionOrdersRequest;
  }

  async scrapeAllRegionOrders(regionId: number) {
    this.currentRegionId = regionId;
    let orders = 0;
    let reachedMaxPages = false;
    let pageNum = 1;

    while (!reachedMaxPages) {
      const regionOrdersRequest = await this.getRegionOrders(regionId, pageNum);

      if (regionOrdersRequest.status === 504) {
        console.log('Request timed out. Retrying in 1 second...');
        setTimeout(() => {}, 1000);
        continue;
      }

      if (regionOrdersRequest.status === 200) {
        console.log(
          `Scraped page ${pageNum} of orders for region ${regionId}.`,
        );

        regionOrdersRequest.data.forEach((scrapedOrder) => {
          const order = new Order();
          order.order_id = scrapedOrder.order_id;
          order.duration = scrapedOrder.duration;
          order.is_buy_order = scrapedOrder.is_buy_order;
          order.issued = new Date(scrapedOrder.issued);
          order.min_volume = scrapedOrder.min_volume;
          order.volume_remain = scrapedOrder.volume_remain;
          order.volume_total = scrapedOrder.volume_total;
          order.region_id = regionId;
          order.location_id = scrapedOrder.location_id;
          order.system_id = scrapedOrder.system_id;
          order.type_id = scrapedOrder.type_id;
          order.price = scrapedOrder.price;
          order.range = scrapedOrder.range;

          this.orderRepository.save(order);
        });
        console.log(`Save successful.`);
        orders += regionOrdersRequest.data.length;

        pageNum++;
      }

      if (regionOrdersRequest.status === 404) {
        reachedMaxPages = true;
        console.log(`Saved all pages for region ${regionId}.`);
      }
    }

    console.log(`Saved ${orders} orders for region ${regionId}.`);
    return orders;
  }

  async scrapeAllRegionsAllOrders() {
    const regions = await this.regionRepository.find();

    for (const region of regions) {
      await this.scrapeAllRegionOrders(region.id);
      setTimeout(() => {}, 500);
    }
    const count = await this.orderRepository.count();
    console.log(`Saved ${count} orders for all regions.`);
  }

  async continueAllRegionsAllOrders(regionId: number = this.currentRegionId) {
    if (!regionId) {
      console.error('No current region. Start scraping all regions first.');
      return;
    }
    const deleted = await this.orderRepository.delete({
      region_id: regionId,
    });

    console.log(`Deleted ${deleted.affected} orders from region ${regionId}.`);

    console.log(`Continuing from ${regionId} region.`);

    const regions = await this.regionRepository.find({
      where: { id: MoreThanOrEqual(regionId) },
    });

    for (const region of regions) {
      await this.scrapeAllRegionOrders(region.id);
      setTimeout(() => {}, 500);
    }
    const count = await this.orderRepository.count();
    console.log(`Saved ${count} orders for all regions.`);
    this.currentRegionId = null;
  }

  async getOrdersTotal() {
    const count = await this.orderRepository.count();
    return `Total orders: ${count}`;
  }

  async wipeAllOrders() {
    await this.orderRepository.clear();
  }

  async wipeRegionOrders(regionId: number) {
    await this.orderRepository.delete({ region_id: regionId });
  }
}
