import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { CustomLoggerService } from './custom-logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useLogger(new CustomLoggerService(configService));

  const customLoggerService = new CustomLoggerService(configService);
  customLoggerService.setContext(bootstrap.name);

  process.on('uncaughtException', (err: Error) => {
    const errorLog = `Uncaught Exception occurred at: ${JSON.stringify(
      err.stack || err,
    )}`;
    customLoggerService.warn(errorLog, bootstrap.name);
  });

  process.on('unhandledRejection', (err: Error) => {
    const errorLog = `Unhandled Rejection occurred at: ${JSON.stringify(
      err.stack || err,
    )}`;
    customLoggerService.warn(errorLog, bootstrap.name);
  });
  const DOC_API = await readFile(
    join(process.cwd(), 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);

  const PORT = new ConfigService().get<number>('PORT') || 4000;

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(PORT);
}
bootstrap();
