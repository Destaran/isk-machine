import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ExtendRegionTable1727968614661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'region',
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('region', 'description');
  }
}
