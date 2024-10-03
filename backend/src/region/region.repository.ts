import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Region } from './region.entity';

@Injectable()
export class RegionRepository extends Repository<Region> {
  constructor(dataSource: DataSource) {
    super(Region, dataSource.createEntityManager());
  }
}
