import { GetMarketsRegionIdOrdersResponse } from 'src/client';
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

  static fromEntity(
    entity: GetMarketsRegionIdOrdersResponse[number],
    regionId: number,
  ): Order {
    const order = new Order();
    order.order_id = entity.order_id;
    order.duration = entity.duration;
    order.is_buy_order = entity.is_buy_order;
    order.issued = new Date(entity.issued);
    order.min_volume = entity.min_volume;
    order.volume_remain = entity.volume_remain;
    order.volume_total = entity.volume_total;
    order.location_id = entity.location_id;
    order.system_id = entity.system_id;
    order.region_id = regionId;
    order.type_id = entity.type_id;
    order.price = entity.price;
    order.range = entity.range;
    return order;
  }
}
