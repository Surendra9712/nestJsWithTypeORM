import {ExecutionContext, Injectable} from '@nestjs/common';
import {SnapUnauthorizedException} from '@snapSystem/exceptions/snap-unauthorized.exception';
import {Reflector} from '@nestjs/core';
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public constructor(
        private reflector: Reflector,
    ) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            'isPublic',
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw new SnapUnauthorizedException();
        }
        return user;
    }
}
