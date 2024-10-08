import {BaseDto} from "@snapSystem/base-entity/dto/base.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength} from "class-validator";
import {PlatformTypeEnum} from "@common/enum/platform-type.enum";

export class CreateProductDto  extends BaseDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(250)
    public title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDecimal()
    public price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    public currency: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    public description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    public tags: Array<string>;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public categoryId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl( {
        protocols: ['http', 'https'],
        allow_underscores: true,
    })
    public thumbnailUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PlatformTypeEnum)
    public platformType: PlatformTypeEnum;
}