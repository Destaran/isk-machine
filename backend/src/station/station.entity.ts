import { GetUniverseStationsStationIdResponse } from 'src/client';
import { System } from 'src/system/system.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

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

  @ManyToOne(() => System, (system) => system.stations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'system_id' })
  system: System;

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

  static fromEntity(entity: GetUniverseStationsStationIdResponse): Station {
    const station = new Station();
    station.id = entity.station_id;
    station.name = entity.name;
    station.owner_id = entity.owner;
    station.system_id = entity.system_id;
    station.type_id = entity.type_id;
    station.max_dockable_ship_volume = entity.max_dockable_ship_volume;
    station.office_rental_cost = entity.office_rental_cost;
    station.race_id = entity.race_id;
    station.reprocessing_efficiency = entity.reprocessing_efficiency;
    station.reprocessing_stations_take = entity.reprocessing_stations_take;
    station.services = entity.services;
    return station;
  }
}
