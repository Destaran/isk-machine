import { Body, Controller, Post } from '@nestjs/common';
import { MarketHistoryService } from './market-history.service';

@Controller('market-history')
export class MarketHistoryController {
  constructor(private readonly marketHistoryService: MarketHistoryService) {}

  @Post('scrape')
  async scrape(
    @Body('typeId') typeId: number,
    @Body('regionId') regionId: number,
  ) {
    return await this.marketHistoryService.scrape(typeId, regionId);
  }
}
