import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Constellation } from './constellation.entity';

@Injectable()
export class ConstellationRepository extends Repository<Constellation> {
  constructor(dataSource: DataSource) {
    super(Constellation, dataSource.createEntityManager());
  }
}
