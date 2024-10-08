import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {SnapUnauthorizedException} from '@snapSystem/exceptions/snap-unauthorized.exception';
import {Reflector} from '@nestjs/core';
import {getTokenFromHeader} from "@helpers/helper-functions";
import {AuthService} from "@appModules/auth/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(
        private authService: AuthService,
        private reflector: Reflector,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            'isPublic',
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authToken: string | undefined = getTokenFromHeader(request);
        if (!authToken) {
            throw new SnapUnauthorizedException();
        }
        try {
            request.user = await this.authService.verifyToken(authToken);
        } catch {
            throw new SnapUnauthorizedException('Token has been expired.');
        }
        return true;
    }
}
