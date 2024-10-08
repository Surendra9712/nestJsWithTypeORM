import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";
import {QueryParamsDto} from "@snapSystem/base-entity/dto/query-params.dto";

export class ProductParamsDto  extends QueryParamsDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    public title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    public platformType: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    public categoryId: string;
}