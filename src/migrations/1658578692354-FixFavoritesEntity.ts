import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixFavoritesEntity1658578692354 implements MigrationInterface {
  name = 'FixFavoritesEntity1658578692354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_615a4884588a44718243e290740"`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "FK_6a5822b115020da7ab3609f369c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_8bb45f5c99469634559742c4e39"`,
    );
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "favoriteId"`);
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "favoriteId"`);
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "favoriteId"`);
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "artists" character varying array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "albums" character varying array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "tracks" character varying array NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "tracks"`);
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "albums"`);
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "artists"`);
    await queryRunner.query(`ALTER TABLE "albums" ADD "favoriteId" uuid`);
    await queryRunner.query(`ALTER TABLE "artists" ADD "favoriteId" uuid`);
    await queryRunner.query(`ALTER TABLE "tracks" ADD "favoriteId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_8bb45f5c99469634559742c4e39" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "FK_6a5822b115020da7ab3609f369c" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_615a4884588a44718243e290740" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
