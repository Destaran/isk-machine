import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('types')
export class Type {
  @PrimaryColumn('uuid', { nullable: false })
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
}
