import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddStationTable1729715298938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'station',
        columns: [
          {
            name: 'id',
            type: 'int',
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
            isNullable: false,
          },
          {
            name: 'system_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'type_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'max_dockable_ship_volume',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'office_rental_cost',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'race_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'reprocessing_efficiency',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'reprocessing_stations_take',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'services',
            type: 'text',
            isArray: true,
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('station');
  }
}
