import { Body, Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get('opportunities')
  async getOpportunities(
    @Body('from') from: number,
    @Body('to') to: number,
    @Body('margin') margin: number,
    @Body('volume') volume: number,
  ) {
    return await this.marketService.getOpportunities(from, to, margin, volume);
  }
}
