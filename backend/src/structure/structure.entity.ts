import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('structure')
export class Structure {
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
}
