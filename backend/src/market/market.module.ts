import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { OrdersRepository } from 'src/orders/orders.repository';
import { DataScraperService } from 'src/data-scraper/data-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { RegionModule } from 'src/region/region.module';
import { SystemModule } from 'src/system/system.module';

@Module({
  imports: [HttpModule, RegionModule, SystemModule],
  providers: [MarketService, OrdersRepository, DataScraperService],
  controllers: [MarketController],
})
export class MarketModule {}
