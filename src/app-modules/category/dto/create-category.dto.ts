import {BaseDto} from "@snapSystem/base-entity/dto/base.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateCategoryDto extends BaseDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    public title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    public description: string;
}