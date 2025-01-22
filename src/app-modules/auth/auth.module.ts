import {Module} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {AuthController} from './auth.controller';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {UserRepository} from "@appModules/users/repositories/user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "@models/user/user.entity";
import {APP_GUARD} from "@nestjs/core";
import {AuthRepository} from "@appModules/auth/repositories/auth.repository";
import {AccessTokenEntity} from "@models/auth/access-token.entity";
import {MailerModule} from "@nestjs-modules/mailer";
import {MailService} from "@appModules/auth/services/mail.service";
import {PasswordResetEntity} from "@models/auth/password-reset.entity";
import {PasswordResetRepository} from "@appModules/auth/repositories/password-reset.repository";
import {
    IsPasswordDifferentConstraint
} from "@snapSystem/validators/is-password-different.validator";
import GoogleOauthConfig from "../../config/google-oauth.config";
import {GoogleStrategy} from "@appModules/auth/strategies/google.strategy";
import {JwtStrategy} from "@appModules/auth/strategies/jwt.strategy";
import {JwtAuthGuard} from "@appModules/auth/guard/auth.guard";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, AccessTokenEntity, PasswordResetEntity]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                privateKey: config.get('auth.privateKey'),
                publicKey: config.get('auth.publicKey'),
                signOptions: {
                    algorithm: 'RS256',
                    expiresIn: config.get('app.expireIn')
                },
            }),
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                transport: {
                    host: config.get('app.mailHost'),
                    port: config.get('app.mailPort'),
                    secure: false,
                    auth: {
                        user: config.get('app.mailUser'),
                        pass: config.get('app.mailPass'),
                    },
                },
                defaults: {
                    from: config.get('app.mailFrom'),
                },
            })
        }),
        ConfigModule.forFeature(GoogleOauthConfig)
    ],
    providers: [
        AuthService,
        AuthRepository,
        UserRepository,
        MailService,
        PasswordResetRepository,
        IsPasswordDifferentConstraint,
        JwtStrategy,
        GoogleStrategy,
        {provide: APP_GUARD, useClass: JwtAuthGuard},
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {
}
