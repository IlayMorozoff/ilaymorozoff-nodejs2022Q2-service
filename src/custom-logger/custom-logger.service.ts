import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  fileName = '';
  constructor(config: ConfigService) {
    const environment = config.get('NODE_ENV');
    super();
    const logLevels: LogLevel[] =
      environment === 'production'
        ? ['log', 'warn', 'error']
        : ['error', 'warn', 'log', 'verbose', 'debug'];
    this.setLogLevels(logLevels);
  }

  log(message: string, context?: string) {
    super.log.apply(this, [`\n${message}`, context]);
    // this.writeLogToFile(message, 'log', context);
  }

  error(message: string, context?: string) {
    super.error.apply(this, [`\n${message}`, context]);
    // this.writeLogToFile(message, 'error', context);
  }

  warn(message: string, context?: string) {
    super.warn.apply(this, [`\n${message}`, context]);
    // this.writeLogToFile(message, 'warn', context);
  }

  debug(message: string, context?: string) {
    super.debug.apply(this, [`\n${message}`, context]);
  }

  verbose(message: string, context?: string) {
    super.verbose.apply(this, [`\n${message}`, context]);
  }
}
