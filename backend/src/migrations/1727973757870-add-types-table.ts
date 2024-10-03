import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTypesTable1727973757870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'types',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'capacity',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'group_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'market_group_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'mass',
            type: 'numeric',
            isNullable: false,
          },
          {
            name: 'packaged_volume',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'portion_size',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'published',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'volume',
            type: 'numeric',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('type');
  }
}
