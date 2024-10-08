import { HttpException } from '@nestjs/common';

export abstract class SnapException extends HttpException {
  protected errCode: string;

  protected constructor(
    message: string | Record<string, any>,
    statusCode = 500,
    errCode = 'err_server_error',
  ) {
    super(message, statusCode);
    this.errCode = errCode;
  }

  public getErrCode(): string {
    return this.errCode;
  }
}
