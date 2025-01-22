import {BaseDto} from "@snapSystem/base-entity/dto/base.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateCartDto extends BaseDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public quantity:number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public productId:number;

    public orderBy:number;
    public totalPrice: number;

}