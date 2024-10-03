import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { OrderRepository } from 'src/data-scraper/order.repository';
import { DataScraperService } from 'src/data-scraper/data-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { RegionModule } from 'src/region/region.module';
import { SystemModule } from 'src/system/system.module';

@Module({
  imports: [HttpModule, RegionModule, SystemModule],
  providers: [MarketService, OrderRepository, DataScraperService],
  controllers: [MarketController],
})
export class MarketModule {}
