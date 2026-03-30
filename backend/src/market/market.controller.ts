import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MarketService } from './market.service';
import { LocationSearchResult } from './location-search-result.interface';

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

  @Get('locations/search')
  async searchLocations(
    @Query('s') search: string,
  ): Promise<LocationSearchResult[]> {
    return await this.marketService.searchLocations(search);
  }

  @Get('locations/:id')
  async getLocationById(
    @Param('id') id: number,
  ): Promise<LocationSearchResult | null> {
    return await this.marketService.getLocationById(id);
  }

  @Post('opportunities')
  async getOpportunities(
    @Body('buyLocation') buyLocation?: number,
    @Body('sellLocation') sellLocation?: number,
    @Body('volatility') volatility?: number,
    @Body('margin') margin?: number,
    @Body('maxMargin') maxMargin?: number,
    @Body('dailyProfit') dailyProfit?: number,
    @Body('minVolume') minVolume?: number,
    @Body('brokerFee') brokerFee?: number,
    @Body('salesTax') salesTax?: number,
  ) {
    return await this.marketService.getOpportunities(
      buyLocation,
      sellLocation,
      volatility,
      margin,
      maxMargin,
      dailyProfit,
      minVolume,
      brokerFee,
      salesTax,
    );
  }
}
