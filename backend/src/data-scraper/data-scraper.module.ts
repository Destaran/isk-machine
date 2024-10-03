import { Module } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { DataScraperController } from './data-scraper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from '../region/region.entity';
import { System } from '../system/system.entity';
import { RegionModule } from 'src/region/region.module';
import { SystemModule } from 'src/system/system.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Region, System]),
    RegionModule,
    SystemModule,
    OrdersModule,
  ],
  providers: [DataScraperService],
  controllers: [DataScraperController],
})
export class DataScraperModule {}
