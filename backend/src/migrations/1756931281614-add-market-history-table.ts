import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddMarketHistoryTable1756931281614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'market_history',
        columns: [
          {
            name: 'type_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'region_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'average',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'highest',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'lowest',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'order_count',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'volume',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('market_history');
  }
}
