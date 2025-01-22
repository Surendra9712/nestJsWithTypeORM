import {Body, Controller, Delete, Get, Param, Post, Req} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CartService} from "@appModules/cart/cart.service";
import {CreateCartDto} from "@appModules/cart/dto/create-cart.dto";
import {ParseIdPipe} from "@common/pipes/parseId.pipe";
import {Request} from "express";
import {OrderSerializer} from "@models/order/order-serializer";

@Controller('api/carts')
@ApiTags('Carts')
export class CartController {
    constructor(private readonly cartService: CartService) {
    }

    @Get()
    public async findAll(@Req() req: Request): Promise<OrderSerializer> {
        return this.cartService.getCartItems(req.user['id']);
    }

    @Post()
    public async create(@Body() createCartDto: CreateCartDto, @Req() req: Request): Promise<OrderSerializer> {
        createCartDto.orderBy = req.user['id'];
        return this.cartService.createOrder(createCartDto);
    }

    @Delete(':id')
    public async remove(@Param('id', ParseIdPipe) id: number): Promise<boolean> {
        return this.cartService.removeCartItem(id);
    }

    @Delete(':orderId/product/:productId')
    public async removeProduct(
        @Param('orderId', ParseIdPipe) orderId: number,
        @Param('productId', ParseIdPipe) productId: number
    ){
        return this.cartService.removeProductFromOrder(orderId, productId);
    }
}
