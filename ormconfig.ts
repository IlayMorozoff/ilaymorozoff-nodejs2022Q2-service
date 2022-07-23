import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const config = new ConfigService();

const connectionSource = new DataSource({
  migrationsTableName: config.get<string>('MIGRATIONS_TABLE_NAME'),
  type: 'postgres',
  host: config.get<string>('DB_HOST'),
  port: Number(config.get<number>('DB_PORT')),
  username: config.get<string>('DB_USERNAME'),
  password: String(config.get<string>('DB_PASSWORD')),
  database: config.get<string>('DB_NAME'),
  logging: false,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: true,
});

export default connectionSource;
