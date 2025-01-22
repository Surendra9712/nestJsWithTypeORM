import {BaseDto} from "@snapSystem/base-entity/dto/base.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateCategoryDto extends BaseDto{
    @ApiProperty()
    @IsString()
    @MaxLength(250)
    @IsNotEmpty()
    public title: string;

    @ApiProperty()
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    public description: string;
}