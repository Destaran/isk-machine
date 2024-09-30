import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { OrderRepository } from 'src/data-scraper/order.repository';
import { DataScraperService } from 'src/data-scraper/data-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { RegionRepository } from 'src/data-scraper/region.repository';
import { SystemRepository } from 'src/data-scraper/system.repository';

@Module({
  imports: [HttpModule],
  providers: [
    MarketService,
    OrderRepository,
    DataScraperService,
    RegionRepository,
    SystemRepository,
  ],
  controllers: [MarketController],
})
export class MarketModule {}
