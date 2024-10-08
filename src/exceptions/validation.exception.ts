import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(validationErrors: any) {
    super(
      validationErrors,
      HttpStatus.EXPECTATION_FAILED,
    );
  }
}
