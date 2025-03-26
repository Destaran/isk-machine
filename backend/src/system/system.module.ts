import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { System } from './system.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { SystemRepository } from './system.repository';
import { DataScraper } from 'src/data-scraper/data-scraper';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([System])],
  exports: [SystemService],
  providers: [SystemService, SystemRepository, DataScraper],
})
export class SystemModule {}
