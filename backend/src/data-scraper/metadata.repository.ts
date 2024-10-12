import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Metadata } from './metadata.entity';

@Injectable()
export class MetadataRepository extends Repository<Metadata> {
  constructor(dataSource: DataSource) {
    super(Metadata, dataSource.createEntityManager());
  }
}
