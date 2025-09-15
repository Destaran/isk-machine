import { GetMarketsRegionIdHistoryResponse } from 'src/client';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('market_history')
@Unique(['type_id', 'region_id', 'date'])
export class MarketHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  type_id: number;

  @Column('int', { nullable: false })
  region_id: number;

  @Column('date', { nullable: false })
  date: Date;

  @Column('float', { nullable: true })
  average: number;

  @Column('float', { nullable: true })
  highest: number;

  @Column('float', { nullable: true })
  lowest: number;

  @Column('int', { nullable: true })
  order_count: number;

  @Column('int', { nullable: true })
  volume: number;

  static fromEntity(
    entity: GetMarketsRegionIdHistoryResponse[number],
    typeId: number,
    regionId: number,
  ): MarketHistory {
    const marketHistory = new MarketHistory();
    marketHistory.type_id = typeId;
    marketHistory.region_id = regionId;
    marketHistory.date = new Date(entity.date);
    marketHistory.average = entity.average;
    marketHistory.highest = entity.highest;
    marketHistory.lowest = entity.lowest;
    marketHistory.order_count = entity.order_count;
    marketHistory.volume = entity.volume;
    return marketHistory;
  }
}
