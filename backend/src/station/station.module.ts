import { Module } from '@nestjs/common';
import { StationService } from './station.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { StationRepository } from './station.repository';
import { SystemModule } from 'src/system/system.module';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Station]), SystemModule],
  exports: [StationService],
  providers: [StationService, StationRepository],
})
export class StationModule {}
