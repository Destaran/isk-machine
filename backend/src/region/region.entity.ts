import { GetUniverseRegionsRegionIdResponse } from 'src/client';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('region')
export class Region {
  @PrimaryColumn('varchar', { length: 255, nullable: false })
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  static fromEntity(entity: GetUniverseRegionsRegionIdResponse) {
    const region = new Region();
    region.id = entity.region_id;
    region.name = entity.name;
    region.description = entity.description;
    return region;
  }
}
