import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { TypeRepository } from './type.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Type])],
  exports: [TypeService],
  providers: [TypeService, TypeRepository],
})
export class TypeModule {}
