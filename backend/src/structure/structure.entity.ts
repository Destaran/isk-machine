import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('structure')
export class Structure {
  @PrimaryColumn('bigint', { nullable: false })
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('int')
  owner_id: number;

  @Column('int')
  system_id: number;

  @Column('int')
  type_id: number;
}
