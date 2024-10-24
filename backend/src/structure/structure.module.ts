import { Module } from '@nestjs/common';
import { StructureService } from './structure.service';
import { HttpModule } from '@nestjs/axios';
import { Structure } from './structure.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from 'src/system/system.module';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Structure]), SystemModule],
  providers: [StructureService],
})
export class StructureModule {}
