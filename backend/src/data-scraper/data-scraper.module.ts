import { Module } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { DataScraperController } from './data-scraper.controller';
import { RegionRepository } from './region.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { OrderRepository } from './order.repository';
import { SystemRepository } from './system.repository';
import { System } from './system.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Region, System])],
  providers: [
    DataScraperService,
    RegionRepository,
    OrderRepository,
    SystemRepository,
  ],
  controllers: [DataScraperController],
})
export class DataScraperModule {}
