import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshToketColumn1659208859599 implements MigrationInterface {
  name = 'AddRefreshToketColumn1659208859599';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refreshToken" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
  }
}
