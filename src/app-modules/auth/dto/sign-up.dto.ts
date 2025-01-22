import {BaseDto} from '@snapSystem/base-entity/dto/base.dto';
import {ApiProperty} from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString, IsStrongPassword,
    MaxLength, MinLength
} from "class-validator";
import {Match} from "@snapSystem/validators/match.validator";
import {IsUnique} from "@snapSystem/validators/unique.validator";
import {UserEntity} from "@models/user/user.entity";

export class SignUpDto extends BaseDto {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsEmail({},{message:'username must be a valid email address.'})
    @MaxLength(50)
    @IsUnique(UserEntity,'email')
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsStrongPassword({},{message:'password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'})
    @MaxLength(16)
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @Match('password')
    @IsNotEmpty()
    confirmPassword: string;
}
