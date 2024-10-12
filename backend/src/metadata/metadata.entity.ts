import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('metadata')
export class Metadata {
  @PrimaryColumn('varchar', { length: 255, nullable: false })
  id: string;

  @Column('varchar', { length: 255, nullable: true })
  data: string;

  @Column('timestamp', { nullable: true })
  date: Date;
}
