import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { TypesRepository } from './types.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Type])],
  exports: [TypesService],
  providers: [TypesService, TypesRepository],
})
export class TypesModule {}
