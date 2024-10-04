import { Controller, Get, Param, Query } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('orders/:typeId')
  async getOrdersByTypeId(@Param('typeId') typeId: number) {
    return await this.marketService.getOrdersByTypeId(typeId);
  }

  @Get('search')
  async searchTypes(@Query('s') search: string) {
    return await this.marketService.searchTypes(search);
  }
}
