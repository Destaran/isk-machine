import { Controller, Get, Param } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('orders/:typeId')
  async getOrdersByTypeId(@Param('typeId') typeId: number) {
    return await this.marketService.getOrdersByTypeId(typeId);
  }
}
