import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { System } from './system.entity';

@Injectable()
export class SystemRepository extends Repository<System> {
  constructor(dataSource: DataSource) {
    super(System, dataSource.createEntityManager());
  }
}
