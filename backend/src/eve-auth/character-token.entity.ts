import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('character_token')
export class CharacterToken {
  @PrimaryColumn('bigint')
  character_id: number;

  @Column('varchar', { length: 255 })
  character_name: string;

  /** Long-lived token used to obtain fresh access tokens without user interaction. */
  @Column('text')
  refresh_token: string;

  /** Cached access token. Null until first use or after a token rotation. */
  @Column('text', { nullable: true })
  access_token: string | null;

  /** When the cached access token expires. */
  @Column('timestamp', { nullable: true })
  access_token_expires_at: Date | null;

  /** Space-separated list of granted ESI scopes. */
  @Column('text', { nullable: true })
  scopes: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
