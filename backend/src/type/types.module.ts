import { Module } from '@nestjs/common';
import { TypeService } from './types.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { TypeRepository } from './types.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Type])],
  exports: [TypeService],
  providers: [TypeService, TypeRepository],
})
export class TypeModule {}
