import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Init1681477566496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'boolean',
          },
          {
            name: 'createDate',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS unaccent`);
    await queryRunner.query(
      `CREATE INDEX "IDX_name" ON "category" (lower(name COLLATE "ru_RU.utf8"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_description" ON "category" (lower(description COLLATE "ru_RU.utf8"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category');
    await queryRunner.query(`DROP EXTENSION IF EXISTS unaccent`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_name"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_description"`);
  }
}
