import { SnapException } from '@snapSystem/exceptions/snap.exception';
import { HttpStatus } from '@nestjs/common';

export class SnapBadRequestException extends SnapException {
  public static statusCode = HttpStatus.BAD_REQUEST;

  public constructor(message = '', errCode = 'err_bad_request') {
    super(message, SnapBadRequestException.statusCode, errCode);
  }
}
