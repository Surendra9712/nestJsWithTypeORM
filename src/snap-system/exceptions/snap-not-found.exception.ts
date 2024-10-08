import { SnapException } from '@snapSystem/exceptions/snap.exception';
import { HttpStatus } from '@nestjs/common';

export class SnapNotFoundException extends SnapException {
  public static statusCode = HttpStatus.NOT_FOUND;

  public constructor(message = '', errCode = 'err_model_not_found') {
    super(message, SnapNotFoundException.statusCode, errCode);
  }
}
