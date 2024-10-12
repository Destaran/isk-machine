import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddMetadataTable1728745761107 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'metadata',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'data',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('metadata');
  }
}
