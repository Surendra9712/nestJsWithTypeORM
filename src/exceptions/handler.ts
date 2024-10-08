import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { SnapException } from '@snapSystem/exceptions/snap.exception';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionOption } from '@common/types/http-response.type';
import { ValidationException } from 'src/exceptions/validation.exception';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(HttpException, SnapException)
export class ExceptionHandler implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: AbstractHttpAdapter,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: any, host: ArgumentsHost): any {
    const httpAdapter: AbstractHttpAdapter<any, any, any> =
      this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const { httpStatus, httpErrCode } = this.getStatusCodeAndError(exception);

    if (exception instanceof ValidationException) {
      this.handleValidationError(exception, ctx);
    } else {
      const responseBody: HttpExceptionOption = {
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message: exception.message,
        code: httpErrCode,
      };

      const isDebugMode = this.configService.get<boolean>('app.debug');
      if (isDebugMode) {
        responseBody.stackTrace = exception.stack;
      }
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }

  private getStatusCodeAndError(exception: Error): {
    httpStatus: number;
    httpErrCode: string;
  } {
    if (exception instanceof ValidationException) {
      return {
        httpStatus: HttpStatus.EXPECTATION_FAILED,
        httpErrCode: 'err_validation',
      };
    } else if (exception instanceof SnapException) {
      return {
        httpStatus: exception.getStatus(),
        httpErrCode: exception.getErrCode(),
      };
    } else if (exception instanceof HttpException) {
      return {
        httpStatus: exception.getStatus(),
        httpErrCode: 'err_server_error',
      };
    } else {
      return {
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        httpErrCode: 'err_server_error',
      };
    }
  }

  private handleValidationError(
    exception: ValidationException,
    ctx: HttpArgumentsHost,
  ) {
    const response = ctx.getResponse<Response>();

    response
      .status(HttpStatus.EXPECTATION_FAILED)
      .json(exception.getResponse());
  }
}
