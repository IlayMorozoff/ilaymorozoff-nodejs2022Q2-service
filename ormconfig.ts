import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const config = new ConfigService();

export const connectionSource = new DataSource({
  migrationsTableName: config.get<string>('MIGRATIONS_TABLE_NAME'),
  type: config.get<'postgres'>('DB_TYPE'),
  host: config.get<string>('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),
  logging: false,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});
