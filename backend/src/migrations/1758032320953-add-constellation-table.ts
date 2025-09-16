import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddConstellationTable1758032320953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
              new Table({
                name: 'constellation',
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
                    name: 'region_id',
                    type: 'int',
                    isNullable: false,
                  },
                  {
                    name: 'systems',
                    type: 'simple-array',
                    isNullable: false,
                  }
                ],
              }),
              true,
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('constellation');
    }
}
