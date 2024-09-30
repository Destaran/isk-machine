import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('system')
export class System {
  @PrimaryColumn('varchar', { nullable: false })
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('float', { nullable: false })
  security_status: number;
}
