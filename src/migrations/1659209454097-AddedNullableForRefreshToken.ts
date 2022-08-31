import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedNullableForRefreshToken1659209454097
  implements MigrationInterface
{
  name = 'AddedNullableForRefreshToken1659209454097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "refreshToken" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "refreshToken" SET NOT NULL`,
    );
  }
}
