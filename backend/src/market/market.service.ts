import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/data-scraper/order.repository';

@Injectable()
export class MarketService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getOrdersByTypeId(typeId: number) {
    const orders = await this.orderRepository.find({
      where: { type_id: typeId },
    });
    return orders;
  }
}
