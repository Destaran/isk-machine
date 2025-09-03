import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MarketHistory } from './market-history.entity';

@Injectable()
export class MarketHistoryRepository extends Repository<MarketHistory> {
  constructor(dataSource: DataSource) {
    super(MarketHistory, dataSource.createEntityManager());
  }
}
