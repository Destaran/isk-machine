import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { OrderRepository } from 'src/data-scraper/order.repository';

@Module({
  providers: [MarketService, OrderRepository],
  controllers: [MarketController],
})
export class MarketModule {}
