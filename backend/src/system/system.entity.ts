import { GetUniverseSystemsSystemIdResponse } from 'src/client';
import { Station } from 'src/station/station.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('system')
export class System {
  @PrimaryColumn('varchar', { nullable: false })
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('float', { nullable: false })
  security_status: number;

  @Column('int', { nullable: false })
  constellation_id: number;

  @OneToMany(() => Station, (station) => station.system)
  stations: Station[];

  static fromEntity(entity: GetUniverseSystemsSystemIdResponse) {
    const system = new System();
    system.id = entity.system_id;
    system.name = entity.name;
    system.security_status = Number(entity.security_status);
    system.constellation_id = entity.constellation_id;
    return system;
  }
}
