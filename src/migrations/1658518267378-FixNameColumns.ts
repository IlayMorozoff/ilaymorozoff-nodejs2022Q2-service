import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixNameColumns1658518267378 implements MigrationInterface {
  name = 'FixNameColumns1658518267378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_1e03e2bd1fcf232ad271abd3ce8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_9f1ae55a42d496bf41ca62094ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_fe45a574bef96d4b1db1e1467a0"`,
    );
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "artistsId"`);
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "albumsId"`);
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "artistsId"`);
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`,
    );
    await queryRunner.query(`ALTER TABLE "albums" ADD "artistsId" uuid`);
    await queryRunner.query(`ALTER TABLE "tracks" ADD "albumsId" uuid`);
    await queryRunner.query(`ALTER TABLE "tracks" ADD "artistsId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_fe45a574bef96d4b1db1e1467a0" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_9f1ae55a42d496bf41ca62094ad" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_1e03e2bd1fcf232ad271abd3ce8" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
