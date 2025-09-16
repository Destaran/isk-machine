import { Module } from '@nestjs/common';
import { ConstellationService } from './constellation.service';
import { HttpModule } from '@nestjs/axios';
import { Constellation } from './constellation.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { ConstellationRepository } from './constellation.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Constellation])],
  providers: [ConstellationService, ConstellationRepository, DataScraper],
  exports: [ConstellationService],
})
export class ConstellationModule {}
