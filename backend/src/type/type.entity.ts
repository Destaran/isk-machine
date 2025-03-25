import { GetUniverseTypesTypeIdResponse } from 'src/client';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('types')
export class Type {
  @PrimaryColumn('int', { nullable: false })
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('numeric', { nullable: true })
  capacity: number;

  @Column('text', { nullable: false })
  description: string;

  @Column('int', { nullable: false })
  group_id: number;

  @Column('int', { nullable: true })
  market_group_id: number;

  @Column('numeric', { nullable: false })
  mass: number;

  @Column('numeric', { nullable: true })
  packaged_volume: number;

  @Column('int', { nullable: true })
  portion_size: number;

  @Column('boolean', { nullable: false })
  published: boolean;

  @Column('numeric', { nullable: true })
  volume: number;

  static fromEntity(entity: GetUniverseTypesTypeIdResponse) {
    const type = new Type();
    type.id = entity.type_id;
    type.name = entity.name;
    type.capacity = entity.capacity;
    type.description = entity.description;
    type.group_id = entity.group_id;
    type.market_group_id = entity.market_group_id;
    type.mass = entity.mass;
    type.packaged_volume = entity.packaged_volume;
    type.portion_size = entity.portion_size;
    type.published = entity.published;
    type.volume = entity.volume;
    return type;
  }
}
