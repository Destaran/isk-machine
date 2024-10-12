import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from './metadata.entity';
import { MetadataRepository } from './metadata.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Metadata])],
  exports: [MetadataService],
  providers: [MetadataService, MetadataRepository],
})
export class MetadataModule {}
