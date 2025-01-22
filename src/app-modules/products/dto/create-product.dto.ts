import {BaseDto} from "@snapSystem/base-entity/dto/base.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength} from "class-validator";
import {PlatformTypeEnum} from "@common/enum/platform-type.enum";

export class CreateProductDto  extends BaseDto{
    @ApiProperty()
    @IsString()
    @MaxLength(250)
    @IsNotEmpty()
    public title: string;

    @ApiProperty()
    @IsDecimal()
    @IsNotEmpty()
    public price: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public currency: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public description: string;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    public tags: Array<string>;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public categoryId: number;

    @ApiProperty()
    @IsUrl( {
        protocols: ['http', 'https'],
        allow_underscores: true,
        host_whitelist:['localhost']
    })
    @IsNotEmpty()
    public thumbnailUrl: string;

    @ApiProperty()
    @IsEnum(PlatformTypeEnum)
    @IsNotEmpty()
    public platformType: PlatformTypeEnum;
}