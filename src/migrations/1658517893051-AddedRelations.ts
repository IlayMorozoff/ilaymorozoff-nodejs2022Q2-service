import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRelations1658517893051 implements MigrationInterface {
  name = 'AddedRelations1658517893051';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`,
    );
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, "artistsId" uuid, "albumsId" uuid, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "albums" ADD "artistsId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "REL_ed378d7c337efd4d5c8396a77a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_1e03e2bd1fcf232ad271abd3ce8" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_9f1ae55a42d496bf41ca62094ad" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_fe45a574bef96d4b1db1e1467a0" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_fe45a574bef96d4b1db1e1467a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_9f1ae55a42d496bf41ca62094ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_1e03e2bd1fcf232ad271abd3ce8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "REL_ed378d7c337efd4d5c8396a77a" UNIQUE ("artistId")`,
    );
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "artistsId"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
