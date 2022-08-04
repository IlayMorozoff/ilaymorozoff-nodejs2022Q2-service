import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';
import { ExpressRequestInterface } from 'src/common/types';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private customLoggerService: CustomLoggerService;
  constructor(private config: ConfigService) {
    this.customLoggerService = new CustomLoggerService(this.config);
    this.customLoggerService.setContext(LoggerMiddleware.name);
  }

  use(
    request: ExpressRequestInterface,
    response: Response,
    next: NextFunction,
  ): void {
    const { method, body, params, originalUrl } = request;
    let statusCode = 200;
    if (request.user) {
      if (method === 'POST') statusCode = 201;
      if (method === 'DELETE') statusCode = 204;
    } else {
      statusCode = 401;
    }

    const log = `\nResponse Code: ${statusCode} - Method: ${method} - URL: ${originalUrl}
    Body - ${JSON.stringify(body)}
    Params: ${JSON.stringify(params)}
    `;
    this.customLoggerService.log(log, LoggerMiddleware.name);

    next();
  }
}
