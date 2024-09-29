import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryColumn('bigint', { nullable: false })
  order_id: number;

  @Column('int', { nullable: true })
  duration: number;

  @Column('boolean', { nullable: true })
  is_buy_order: boolean;

  @Column('timestamp', { nullable: true })
  issued: Date;

  @Column('int', { nullable: true })
  min_volume: number;

  @Column('int', { nullable: true })
  volume_remain: number;

  @Column('int', { nullable: true })
  volume_total: number;

  @Column('bigint', { nullable: true })
  location_id: number;

  @Column('int', { nullable: true })
  system_id: number;

  @Column('int', { nullable: true })
  region_id: number;

  @Column('int', { nullable: true })
  type_id: number;

  @Column('float', { nullable: true })
  price: number;

  @Column('varchar', { nullable: true })
  range: string;
}
