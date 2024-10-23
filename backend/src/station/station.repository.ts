import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Station } from './station.entity';

@Injectable()
export class StationRepository extends Repository<Station> {
  constructor(dataSource: DataSource) {
    super(Station, dataSource.createEntityManager());
  }
}
