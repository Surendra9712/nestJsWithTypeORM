import { SnapException } from '@snapSystem/exceptions/snap.exception';
import { HttpStatus } from '@nestjs/common';

export class SnapForbiddenException extends SnapException {
  public static statusCode = HttpStatus.FORBIDDEN;

  public constructor(message = '', errCode = 'err_forbidden') {
    super(message, SnapForbiddenException.statusCode, errCode);
  }
}
