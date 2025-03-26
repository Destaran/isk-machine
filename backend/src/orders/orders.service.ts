import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { RegionService } from 'src/region/region.service';
import { SmartUrl } from 'src/data-scraper/smart-url';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    private readonly regionService: RegionService,
    private readonly dataScraper: DataScraper,
  ) {}

  async scrape() {
    const regionIds = await this.regionService.getRegionIds();
    const all = [];
    for (const regionId of regionIds) {
      await this.orderRepository.delete({ region_id: regionId });
      const regionAll = [];
      const smarUrlForRegion = new SmartUrl(
        'markets',
        `${regionId}/orders`,
        '?datasource=tranquility&order_type=all',
      );
      const firstRequest = await this.dataScraper.fetchFromPage(
        smarUrlForRegion,
        1,
      );
      const firstOrders = firstRequest.data.map((entity) =>
        Order.fromEntity(entity, regionId),
      );
      const firstSaved = await this.orderRepository.upsert(firstOrders, [
        'order_id',
      ]);
      regionAll.push(...firstSaved.identifiers);
      all.push(...firstSaved.identifiers);
      console.log(
        `Scraped ${firstSaved.identifiers.length} orders for region ${regionId}`,
      );

      const pageCount = parseInt(firstRequest.headers['x-pages']);
      const pageNums = Array.from({ length: pageCount - 1 }, (_, i) => i + 2);

      for (const pageNum of pageNums) {
        const request = await this.dataScraper.fetchFromPage(
          smarUrlForRegion,
          pageNum,
        );

        const orders = request.data.map((entity) =>
          Order.fromEntity(entity, regionId),
        );

        const saved = await this.orderRepository.upsert(orders, ['order_id']);
        all.push(...saved.identifiers);
        regionAll.push(...saved.identifiers);
        console.log(
          `Scraped ${saved.identifiers.length} orders for region ${regionId}`,
        );
      }
      console.log(
        `Scraped ${regionAll.length} orders in total for region ${regionId}`,
      );
    }
    console.log(`Scraped ${all.length} orders in total`);
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
