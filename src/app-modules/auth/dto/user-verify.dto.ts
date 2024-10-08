import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class UserVerifyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}