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
      const smarUrlForRegion = new SmartUrl(
        'markets',
        `${regionId}/orders`,
        '?datasource=tranquility&order_type=all',
      );
      const regionAll = await this.dataScraper.fetchAllPages(smarUrlForRegion);
      const chunkedRegionAll = this.dataScraper.chunk(regionAll, 1000);
      for (const chunk of chunkedRegionAll) {
        const entities = chunk.map((order) =>
          Order.fromEntity(order, regionId),
        );
        const saved = await this.orderRepository.upsert(entities, ['order_id']);
        all.push(...saved.identifiers.map((id) => id.order_id));
      }
      console.log(`Scraped ${regionAll.length} orders for region ${regionId}`);
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

  async getByTypeAndLocation(typeId: number, locationId: number) {
    return await this.orderRepository.find({
      where: { type_id: typeId, location_id: locationId },
    });
  }

  async getTypesByLocationId(locationId: number) {
    const allTypes = await this.orderRepository.find({
      where: { location_id: locationId },
      select: ['type_id'],
    });
    const uniqueTypeIds = [...new Set(allTypes.map((order) => order.type_id))];
    return uniqueTypeIds;
  }
}
