import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Structure } from './structure.entity';

@Injectable()
export class StructureRepository extends Repository<Structure> {
  constructor(dataSource: DataSource) {
    super(Structure, dataSource.createEntityManager());
  }
}
