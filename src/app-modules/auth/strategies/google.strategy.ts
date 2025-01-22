import {PassportStrategy} from "@nestjs/passport";
import {Profile, Strategy, VerifyCallback} from "passport-google-oauth20";
import {Inject, Injectable} from "@nestjs/common";
import googleOauthConfig from "../../../config/google-oauth.config";
import {ConfigType} from "@nestjs/config";
import {AuthService} from "@appModules/auth/services/auth.service";
import {CreateUserDto} from "@appModules/users/dto/create-user.dto";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(googleOauthConfig.KEY) googleConfig: ConfigType<typeof googleOauthConfig>,
                private authService: AuthService) {
        super({
            clientID: googleConfig.clientID,
            clientSecret: googleConfig.clientSecret,
            callbackURL: googleConfig.callbackUrl,
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        const user = await this.authService.validateGoogleUser(
            {
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                avatar: profile.photos[0].value,
                password: '',
                confirmPassword: '',
            } as CreateUserDto)
        done(null, user);
    }
}