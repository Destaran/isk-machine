import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { TypesRepository } from './types.repository';
import { DataScraper } from 'src/data-scraper/data-scraper';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Type])],
  exports: [TypesService],
  providers: [TypesService, TypesRepository, DataScraper],
})
export class TypesModule {}
