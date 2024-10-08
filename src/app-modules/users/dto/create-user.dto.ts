import {BaseDto} from '@snapSystem/base-entity/dto/base.dto';
import {ApiProperty} from '@nestjs/swagger';
import {
    IsEmail, IsEnum,
    IsNotEmpty, IsOptional,
    IsString, IsStrongPassword, IsUrl, Matches,
    MaxLength, MinLength
} from "class-validator";
import {UserStatusEnum} from "@common/enum/user-status.enum";
import {Match} from "@snapSystem/validators/match.validator";
import {IsUnique} from "@snapSystem/validators/unique.validator";
import {UserEntity} from "@models/user/user.entity";

export class CreateUserDto extends BaseDto {
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
    @IsUrl()
    @MaxLength(250)
    @IsOptional()
    avatar: string;

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

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(UserStatusEnum)
    @IsOptional()
    status: UserStatusEnum;

    @ApiProperty()
    @IsString()
    @MaxLength(250)
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    @IsOptional()
    username: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    biography: string;
}
