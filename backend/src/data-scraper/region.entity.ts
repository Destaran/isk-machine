import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('region')
export class Region {
  @PrimaryColumn('varchar', { length: 255, nullable: false })
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;
}
