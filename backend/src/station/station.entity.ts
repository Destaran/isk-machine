import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('station')
export class Station {
  @PrimaryColumn('int', { nullable: false })
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('int', { nullable: false })
  owner_id: number;

  @Column('int', { nullable: false })
  system_id: number;

  @Column('int', { nullable: false })
  type_id: number;

  @Column('int', { nullable: false })
  max_dockable_ship_volume: number;

  @Column('bigint', { nullable: false })
  office_rental_cost: number;

  @Column('int', { nullable: false })
  race_id: number;

  @Column('float', { nullable: false })
  reprocessing_efficiency: number;

  @Column('float', { nullable: false })
  reprocessing_stations_take: number;

  @Column('text', { array: true, nullable: false })
  services: string[];
}
