import {
  GetUniverseConstellationsConstellationIdResponse,
} from 'src/client';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('constellation')
export class Constellation {
  @PrimaryColumn('varchar', { nullable: false })
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('int', { nullable: false })
  region_id: number;

  @Column('simple-array', { nullable: false })
  systems: number[];

  static fromEntity(entity: GetUniverseConstellationsConstellationIdResponse) {
    const constellation = new Constellation();
    constellation.id = entity.constellation_id;
    constellation.name = entity.name;
    constellation.region_id = entity.region_id;
    constellation.systems = entity.systems;

    return constellation;
  }
}
