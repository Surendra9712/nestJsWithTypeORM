import { SnapException } from '@snapSystem/exceptions/snap.exception';
import { HttpStatus } from '@nestjs/common';

export class SnapUnauthorizedException extends SnapException {
  public static statusCode = HttpStatus.UNAUTHORIZED;

  public constructor(message = 'Unauthorized access. Make sure you are logged in.', errCode = 'err_unauthorized') {
    super(message, SnapUnauthorizedException.statusCode, errCode);
  }
}
