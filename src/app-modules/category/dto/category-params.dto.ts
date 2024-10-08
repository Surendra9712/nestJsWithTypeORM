import {ApiProperty} from "@nestjs/swagger";
import { IsOptional, IsString} from "class-validator";
import {QueryParamsDto} from "@snapSystem/base-entity/dto/query-params.dto";

export class CategoryParamsDto extends QueryParamsDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    public title: string;
}