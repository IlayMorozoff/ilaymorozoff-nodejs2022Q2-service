import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixTypeFavorites1658548617109 implements MigrationInterface {
  name = 'FixTypeFavorites1658548617109';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_615a4884588a44718243e290740"`,
    );
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "favoriteId"`);
    await queryRunner.query(`ALTER TABLE "tracks" ADD "favoriteId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_8bb45f5c99469634559742c4e39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "FK_6a5822b115020da7ab3609f369c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "PK_890818d27523748dd36a4d1bdc8"`,
    );
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "favoriteId"`);
    await queryRunner.query(`ALTER TABLE "artists" ADD "favoriteId" uuid`);
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "favoriteId"`);
    await queryRunner.query(`ALTER TABLE "albums" ADD "favoriteId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_615a4884588a44718243e290740" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "FK_6a5822b115020da7ab3609f369c" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_8bb45f5c99469634559742c4e39" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_8bb45f5c99469634559742c4e39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "FK_6a5822b115020da7ab3609f369c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_615a4884588a44718243e290740"`,
    );
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "favoriteId"`);
    await queryRunner.query(`ALTER TABLE "albums" ADD "favoriteId" integer`);
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "favoriteId"`);
    await queryRunner.query(`ALTER TABLE "artists" ADD "favoriteId" integer`);
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "PK_890818d27523748dd36a4d1bdc8"`,
    );
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "favorites" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "FK_6a5822b115020da7ab3609f369c" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_8bb45f5c99469634559742c4e39" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "favoriteId"`);
    await queryRunner.query(`ALTER TABLE "tracks" ADD "favoriteId" integer`);
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_615a4884588a44718243e290740" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
