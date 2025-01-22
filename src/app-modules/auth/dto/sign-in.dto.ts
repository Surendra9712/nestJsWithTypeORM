import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class SignInDto {
    @ApiProperty()
    @IsEmail({}, {message: 'username must be a valid email address.'})
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}