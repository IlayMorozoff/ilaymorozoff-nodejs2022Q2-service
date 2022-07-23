import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixTypeFavorites1658610645124 implements MigrationInterface {
  name = 'FixTypeFavorites1658610645124';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "artists"`);
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "albums"`);
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "tracks"`);
    await queryRunner.query(`ALTER TABLE "tracks" ADD "favoritesId" uuid`);
    await queryRunner.query(`ALTER TABLE "artists" ADD "favoritesId" uuid`);
    await queryRunner.query(`ALTER TABLE "albums" ADD "favoritesId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_9f837920b195f2e2aa3e41d8e58" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "FK_ebd440a2ca93675e37029cc9a72" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_847b0a98aeefc528af0bf5af1d4" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_847b0a98aeefc528af0bf5af1d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "FK_ebd440a2ca93675e37029cc9a72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_9f837920b195f2e2aa3e41d8e58"`,
    );
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "favoritesId"`);
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "favoritesId"`);
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "favoritesId"`);
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "tracks" character varying array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "albums" character varying array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "artists" character varying array NOT NULL DEFAULT '{}'`,
    );
  }
}
