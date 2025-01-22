import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {verifyHash} from "@snapSystem/helpers/helpers";
import {InvalidCredentialsException} from "@appModules/auth/exceptions/invalid-credentials.exception";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "@appModules/users/repositories/user.repository";
import {UserSerializer} from "@models/user/user.serializer";
import {AuthRepository} from "@appModules/auth/repositories/auth.repository";
import {v4 as uuid} from 'uuid';
import {frontAppUrl, getTokenFromHeader} from "@helpers/helper-functions";
import {Request} from "express";
import {BaseService} from "@snapSystem/service/base.service";
import {MailService} from "@appModules/auth/services/mail.service";
import {PasswordResetRepository} from "@appModules/auth/repositories/password-reset.repository";
import {ResetPasswordDto} from "@appModules/auth/dto/reset-password.dto";
import {SnapUnauthorizedException} from "@snapSystem/exceptions/snap-unauthorized.exception";
import {SignUpDto} from "@appModules/auth/dto/sign-up.dto";
import {CreateUserDto} from "@appModules/users/dto/create-user.dto";

@Injectable()
export class AuthService extends BaseService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
        @InjectRepository(PasswordResetRepository)
        private readonly passwordResetRepository: PasswordResetRepository,
        private jwtService: JwtService,
        private mailService: MailService
    ) {
        super(authRepository)
    }

    public async signIn(email: string, pass: string) {
        return this.userRepository.first({where: {email}}).then(async (user) => {
            if (!user || !(await verifyHash(pass, user.password))) {
                return Promise.reject(new InvalidCredentialsException());
            }
            return this.generateAccessTokenAndSaveTokenInfo(user);
        })
    }

    async validateUser(userId: number, tokenId: string): Promise<any> {
        await this.authRepository.verifyToken(tokenId);
        return this.userRepository.findOrFail(userId);
    }

   public async googleLogin(user: UserSerializer) {
        return this.generateAccessTokenAndSaveTokenInfo(user);
    }

    public async generateAccessTokenAndSaveTokenInfo(user: UserSerializer) {
        const payload = {sub: user.id, username: user.email, tokenId: uuid()};
        const accessToken = await this.jwtService.signAsync(payload);
        const verifiedToken = await this.jwtService.verifyAsync(accessToken);
        const entity = {
            userId: user.id,
            expiresAt: new Date(verifiedToken.exp * 1000),
            tokenId: verifiedToken.tokenId
        };
        this.authRepository.createEntity(entity).then()
        return {
            user,
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    public async verifyUser(email: string): Promise<boolean> {
        return this.userRepository.verifyUser(email);
    }

    public async findUserByEmail(email: string): Promise<UserSerializer> {
        return this.userRepository.findUserByEmail(email);
    }

    public async logout(req: Request): Promise<boolean> {
        const token = getTokenFromHeader(req);
        try {
            const accessToken = await this.jwtService.verifyAsync(token);
            return this.authRepository.logout(accessToken.tokenId);
        } catch (err) {
            return Promise.reject(new SnapUnauthorizedException());
        }
    }

    public async sendEmail(email: string): Promise<boolean> {
        const user = await this.findUserByEmail(email);
        const url = await this.passwordResetRepository.createPasswordResetEntityAndGetResetUrl(email);
        this.mailService.sendEmail(user, 'Password Reset Link', url).then();
        return true;
    }

    public async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<boolean> {
        return this.passwordResetRepository.resetPassword(resetPasswordDto);
    }

    public async signUp(signUpDto: SignUpDto): Promise<UserSerializer> {
        const user = await this.userRepository.createEntity(signUpDto).then();
        this.sendVerificationEmail(user).then();
        return Promise.resolve(user);
    }

    public async sendAccountVerificationEmail(email: string): Promise<boolean> {
        const user = await this.findUserByEmail(email);
        this.sendVerificationEmail(user).then();
        return Promise.resolve(true)
    }

    private async sendVerificationEmail(user: UserSerializer): Promise<void> {
        const url = `${frontAppUrl()}/users/verify?email=${user.email}`
        this.mailService.sendEmail(user, 'Account Verification Link', url, 'user-verify').then();
    }

    public async validateGoogleUser(googleUser: CreateUserDto) {
        const user = await this.userRepository.findOne({where: {email: googleUser.email}});
        if (user) return user;
        return await this.userRepository.createEntity({...googleUser, isLocked: false});
    }
}
