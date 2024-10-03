import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Type } from './type.entity';

@Injectable()
export class TypeRepository extends Repository<Type> {
  constructor(dataSource: DataSource) {
    super(Type, dataSource.createEntityManager());
  }
}
