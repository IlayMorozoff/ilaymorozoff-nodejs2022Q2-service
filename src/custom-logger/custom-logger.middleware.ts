import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
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
    const { method, body, params, query, originalUrl, ip } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      if (statusCode < HttpStatus.BAD_REQUEST) {
        const log = `\nResponse Code: ${statusCode} - Method: ${method} - URL: ${originalUrl} - IP: ${ip}
        Body - ${JSON.stringify(body)}
        Params: ${JSON.stringify(params)}
        Query params: ${JSON.stringify(query)}
        `;
        this.customLoggerService.log(log, LoggerMiddleware.name);
      }
    });
    next();
  }
}
