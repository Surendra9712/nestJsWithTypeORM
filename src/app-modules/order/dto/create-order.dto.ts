import {BaseDto} from "@snapSystem/base-entity/dto/base.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateOrderDto extends BaseDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public quantity:number;


    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public productId:number;

    public orderBy:number;

    public totalPrice: number;
}