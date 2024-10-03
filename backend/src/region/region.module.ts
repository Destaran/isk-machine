import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from 'src/region/region.entity';
import { RegionService } from './region.service';
import { RegionRepository } from 'src/region/region.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Region])],
  exports: [RegionService],
  providers: [RegionService, RegionRepository],
})
export class RegionModule {}
