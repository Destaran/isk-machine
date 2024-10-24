import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddStructureTable1729805925030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'structure',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'owner_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'system_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'type_id',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('structure');
  }
}
