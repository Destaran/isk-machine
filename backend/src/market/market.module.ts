import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { DataScraperService } from 'src/data-scraper/data-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { RegionModule } from 'src/region/region.module';
import { SystemModule } from 'src/system/system.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [HttpModule, RegionModule, SystemModule, OrdersModule],
  providers: [MarketService, DataScraperService],
  controllers: [MarketController],
})
export class MarketModule {}
