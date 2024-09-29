import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddOrderTable1727634344235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'order_id',
            type: 'bigint',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'is_buy_order',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'issued',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'min_volume',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'volume_remain',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'volume_total',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'location_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'system_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'region_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'type_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'range',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
