import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Inject, Injectable} from '@nestjs/common';
import {AuthService} from "@appModules/auth/services/auth.service";
import AuthConfig from "../../../config/auth.config";
import {ConfigType} from "@nestjs/config";
import authConfig from "../../../config/auth.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(AuthConfig.KEY) authConfiguration: ConfigType<typeof authConfig>,
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: authConfiguration.privateKey
        });
    }

    validate(payload: any) {
        return this.authService.validateUser(payload.sub, payload.tokenId);
    }
}