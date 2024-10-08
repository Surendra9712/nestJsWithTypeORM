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
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    @IsUnique(UserEntity,'email')
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword({},{message:'password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'})
    @MaxLength(16)
    @MinLength(8)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @Match('password')
    confirmPassword: string;
}
