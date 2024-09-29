import { Module } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { DataScraperController } from './data-scraper.controller';
import { RegionRepository } from './region.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { OrderRepository } from './order.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Region])],
  providers: [DataScraperService, RegionRepository, OrderRepository],
  controllers: [DataScraperController],
})
export class DataScraperModule {}
