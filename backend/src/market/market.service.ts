import { Injectable } from '@nestjs/common';
import { DataScraperService } from 'src/data-scraper/data-scraper.service';
import { OrderRepository } from 'src/data-scraper/order.repository';

@Injectable()
export class MarketService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly dataScraperService: DataScraperService,
  ) {}

  async getOrdersByTypeId(typeId: number) {
    const orders = await this.orderRepository.find({
      where: { type_id: typeId },
    });

    // const uniquieRegionIds = [
    //   ...new Set(orders.map((order) => order.region_id)),
    // ];
    // const regions = await this.dataScraperService.postNames(uniquieRegionIds);

    return orders;
  }
}
