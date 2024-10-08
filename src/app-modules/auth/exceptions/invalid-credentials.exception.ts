import { SnapException } from '@snapSystem/exceptions/snap.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends SnapException {
    public static statusCode = HttpStatus.UNAUTHORIZED;

    public constructor(
        message = 'Invalid username/password.',
        errCode = 'err_invalid_credentials',
    ) {
        super(message, InvalidCredentialsException.statusCode, errCode);
    }
}