import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { RegionService } from 'src/region/region.service';
import { firstValueFrom } from 'rxjs';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  private currentRegionId: number | null = null;

  constructor(
    private httpService: HttpService,
    private orderRepository: OrdersRepository,
    private regionService: RegionService,
  ) {}

  async scrapeRegionOrdersByPage(regionId: number, pageNum: number = 1) {
    let regionOrdersUrl = `https://esi.evetech.net/latest/markets/${regionId}/orders/?datasource=tranquility&order_type=all&page=${pageNum}`;

    const regionOrdersRequest = await firstValueFrom(
      this.httpService.get(regionOrdersUrl, {
        validateStatus: (status) => {
          return status === 200 || status === 404 || status === 504;
        },
      }),
    );

    regionOrdersUrl = null;

    return regionOrdersRequest;
  }

  async scrapeAllRegionOrders(regionId: number) {
    this.currentRegionId = regionId;
    let reachedMaxPages = false;
    let pageNum = 1;

    while (!reachedMaxPages) {
      const regionOrdersRequest = await this.scrapeRegionOrdersByPage(
        regionId,
        pageNum,
      );

      if (regionOrdersRequest.status === 504) {
        console.log('Request timed out. Retrying in 1 second...');
        setTimeout(() => {}, 1000);
        continue;
      }

      if (regionOrdersRequest.status === 200) {
        regionOrdersRequest.data.forEach(async (scrapedOrder) => {
          let order = new Order();
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

          await this.orderRepository.save(order);
          order = null;
        });

        pageNum++;
      }

      if (regionOrdersRequest.status === 404) {
        reachedMaxPages = true;
        console.log(`Saved all pages for region ${regionId}.`);
      }
    }
    return;
  }

  async scrapeAllRegionsAllOrders() {
    const regionsIds = await this.regionService.getRegionIds();
    const sortedRegionsIds = regionsIds.sort();

    for (const regionId of sortedRegionsIds) {
      await this.scrapeAllRegionOrders(regionId);
      setTimeout(() => {}, 500);
    }
    const count = await this.orderRepository.count();
    console.log(`Saved ${count} orders for all regions.`);
  }

  async continueAllRegionsAllOrders(regionId: number) {
    if (!regionId) {
      console.error('No current region. Start scraping all regions first.');
      return;
    }

    const deleted = await this.orderRepository.delete({
      region_id: regionId,
    });

    console.log(`Deleted ${deleted.affected} orders from region ${regionId}.`);
    console.log(`Continuing from ${regionId} region.`);

    const regionsIds = await this.regionService.getRegionIds();
    const sortedRegionsIds = regionsIds.sort().filter((id) => id >= regionId);

    for (const regionId of sortedRegionsIds) {
      await this.scrapeAllRegionOrders(regionId);
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

  async getOrdersByTypeId(typeId: number) {
    return await this.orderRepository.find({
      where: { type_id: typeId },
    });
  }
}
