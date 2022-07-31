import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixTypeFavoritesPartTwo1658549728969
  implements MigrationInterface
{
  name = 'FixTypeFavoritesPartTwo1658549728969';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "artists"`);
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "albums"`);
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "tracks"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "tracks" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "albums" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "artists" uuid NOT NULL`,
    );
  }
}
