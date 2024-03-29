import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ExpressRequestInterface } from 'src/common/types';
import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';
import { CustomHttpExeptionResponse } from './all-exeptions.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly customLoggerService: CustomLoggerService) {
    this.customLoggerService.setContext(AllExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse()['message'];
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Critical internal server error occurred!';
    }

    const errorResponse = this.getErrorResponse(status, message, request);
    const errorLog = this.getErrorLog(errorResponse, request, exception);
    this.customLoggerService.error(errorLog, AllExceptionsFilter.name);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ) => ({
    statusCode: status,
    message: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse: CustomHttpExeptionResponse,
    request: ExpressRequestInterface,
    exception: unknown,
  ): string => {
    const { statusCode, message } = errorResponse;
    const { method, url } = request;
    const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
    Body - ${JSON.stringify(request.body)}\n\n
    ${JSON.stringify(errorResponse)}\n\n
    User: ${JSON.stringify(request.user ?? 'Not signed in')}\n\n
    Stack trace - ${
      exception instanceof HttpException ? exception.stack : message
    }\n\n`;
    return errorLog;
  };
}
