import { Module } from '@nestjs/common';
import { StructureService } from './structure.service';
import { HttpModule } from '@nestjs/axios';
import { Structure } from './structure.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from 'src/system/system.module';
import { StructureRepository } from './structure.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Structure]), SystemModule],
  providers: [StructureService, StructureRepository],
  exports: [StructureService],
})
export class StructureModule {}
