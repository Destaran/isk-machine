import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { RegionService } from 'src/region/region.service';
import { firstValueFrom } from 'rxjs';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private httpService: HttpService,
    private orderRepository: OrdersRepository,
    private regionService: RegionService,
  ) {}

  async scrapeRegionByPage(regionId: number, pageNum: number = 1) {
    let regionOrdersUrl = `https://esi.evetech.net/latest/markets/${regionId}/orders/?datasource=tranquility&order_type=all&page=${pageNum}`;

    const regionOrdersRequest = await firstValueFrom(
      this.httpService.get(regionOrdersUrl, {
        validateStatus: (status) => {
          return (
            status === 200 || status === 404 || status === 504 || status === 500
          );
        },
        timeout: 15000,
      }),
    );

    regionOrdersUrl = null;

    return regionOrdersRequest;
  }

  async scrapeRegion(regionId: number) {
    console.log(`Scraping orders for region ${regionId}...`);
    await this.wipeRegion(regionId);

    let reachedMaxPages = false;
    let pageNum = 1;

    while (!reachedMaxPages) {
      const regionOrdersRequest = await this.scrapeRegionByPage(
        regionId,
        pageNum,
      );

      if (regionOrdersRequest.status === 404) {
        reachedMaxPages = true;
        console.log(`Saved all pages for region ${regionId}.`);
      }

      if (
        regionOrdersRequest.status === 504 ||
        regionOrdersRequest.status === 500
      ) {
        console.log(
          `Server error ${regionOrdersRequest.status}. Retrying in 2 seconds...`,
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      if (regionOrdersRequest.status === 200) {
        const orders = await Promise.all(
          regionOrdersRequest.data.map(async (scrapedOrder) => {
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

            return order;
          }),
        );

        try {
          await this.orderRepository.upsert(orders, ['order_id']);
        } catch (error) {
          throw new Error(error);
        }

        pageNum++;
      }
    }
    return;
  }

  async scrapeAll() {
    console.log('Scraping all regions orders...');

    const regionsIds = await this.regionService.getRegionIds();
    const sortedRegionsIds = regionsIds.sort();

    for (const regionId of sortedRegionsIds) {
      await this.scrapeRegion(regionId);
    }

    const count = await this.orderRepository.count();
    console.log(`Saved ${count} orders for all regions.`);
  }

  async getTotal() {
    const count = await this.orderRepository.count();
    return `Total orders: ${count}`;
  }

  async wipeAll() {
    const count = await this.orderRepository.count();
    await this.orderRepository.clear();
    console.log(`Deleted ${count} orders.`);
  }

  async wipeRegion(regionId: number) {
    await this.orderRepository.delete({ region_id: regionId });
  }

  async getByTypeId(typeId: number) {
    return await this.orderRepository.find({
      where: { type_id: typeId },
    });
  }
}
