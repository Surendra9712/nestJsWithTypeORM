import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class UserVerifyDto {
    @ApiProperty()
    @IsEmail({},{message:'username must be a valid email address.'})
    @IsNotEmpty()
    email: string;
}