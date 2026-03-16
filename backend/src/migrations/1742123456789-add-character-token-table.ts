import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddCharacterTokenTable1742123456789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'character_token',
        columns: [
          {
            name: 'character_id',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'character_name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'refresh_token',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'access_token',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'access_token_expires_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'scopes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('character_token');
  }
}
