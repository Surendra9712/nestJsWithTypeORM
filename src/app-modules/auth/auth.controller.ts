import {
    Body,
    Controller, Get,
    Post, Put, Req, Res, UseGuards,
} from '@nestjs/common';
import {AuthService} from "@appModules/auth/services/auth.service";
import {SignInDto} from "@appModules/auth/dto/sign-in.dto";
import {ApiTags} from "@nestjs/swagger";
import {UserSerializer} from "@models/user/user.serializer";
import {Request, Response} from "express";
import {Public} from "@appModules/auth/decorator/public.decorator";
import {UserVerifyDto} from "@appModules/auth/dto/user-verify.dto";
import {ResetPasswordDto} from "@appModules/auth/dto/reset-password.dto";
import {SignUpDto} from "@appModules/auth/dto/sign-up.dto";
import {generateHash} from "@snapSystem/helpers/helpers";
import {GoogleAuthGuard} from "@appModules/auth/guard/google-auth.guard";
import {frontAppUrl} from "@helpers/helper-functions";

@Controller('api')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @Post('auth/login')
    public async signIn(@Body() signInDto: SignInDto, @Req() req: Request, @Res() res: Response) {
        return this.authService.signIn(signInDto.username, signInDto.password).then((response: {
            accessToken: string,
            user: UserSerializer
        }) => {
            const {id, firstName, lastName, fullName, avatar, email, isLocked} = response.user;
            res.header('Access-Token', response.accessToken);
            return res.json({id, firstName, lastName, fullName, avatar, email, isLocked});
        });
    }

    @Public()
    @Post('auth/register')
    public async signUp(@Body() signUpDto: SignUpDto, @Req() req: Request, @Res() res: Response) {
        signUpDto.password = await generateHash(signUpDto.password);
        return this.authService.signUp(signUpDto).then((user) => {
            return res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: user.fullName,
                avatar: user.avatar,
                email: user.email,
            });
        });
    }

    @Public()
    @Post('auth/verification-email')
    public async verificationEmail(@Body() userVerifyDto: UserVerifyDto): Promise<boolean> {
        return this.authService.sendAccountVerificationEmail(userVerifyDto.email);
    }

    @Public()
    @Put('auth/verify')
    public async verify(@Body() userVerifyDto: UserVerifyDto): Promise<boolean> {
        return this.authService.verifyUser(userVerifyDto.email);
    }

    @Get('auth/logout')
    public async logout(@Req() req: Request): Promise<boolean> {
        return this.authService.logout(req)
    }

    @Public()
    @Post('password/email')
    public async sendEmail(@Body() body: { email: string }) {
        return this.authService.sendEmail(body.email);
    }

    @Public()
    @Post('password/reset')
    public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<boolean> {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @Get('auth/profile')
    public authUser(@Req() req: Request, @Res() res: Response) {
        const {id, firstName, lastName, fullName, avatar, email, isLocked} = req.user as UserSerializer;
        return res.json({id, firstName, lastName, fullName, avatar, email, isLocked});
    }

    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('auth/google/callback')
    public async googleCallback(@Req() req: Request, @Res() res: Response) {
        const user = await this.authService.googleLogin(req.user as UserSerializer);
        res.redirect(`${frontAppUrl()}/user/callback?token=${user.accessToken}`);
    }
}
