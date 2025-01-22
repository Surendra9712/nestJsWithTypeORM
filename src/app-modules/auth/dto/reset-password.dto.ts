import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength} from "class-validator";
import {BaseDto} from "@snapSystem/base-entity/dto/base.dto";
import {Match} from "@snapSystem/validators/match.validator";
import {IsPasswordDifferent} from "@snapSystem/validators/is-password-different.validator";

export class ResetPasswordDto extends BaseDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({},{message:'username must be a valid email address.'})
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword({},{message:'password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'})
    @MaxLength(16)
    @MinLength(8)
    @IsPasswordDifferent()
    newPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @Match('newPassword')
    confirmPassword: string;
}