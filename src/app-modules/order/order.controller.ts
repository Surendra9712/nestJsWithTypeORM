import {Controller, Delete, Get, Param, Put, Req} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {OrderService} from "@appModules/order/order.service";
import {Request} from "express";
import {OrderSerializer} from "@models/order/order-serializer";
import {ParseIdPipe} from "@common/pipes/parseId.pipe";

@Controller('api/orders')
@ApiTags('Orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Get()
    public async findAll(@Req() req: Request): Promise<OrderSerializer> {
        return this.orderService.getOrderItems(req.user['id']);
    }

    @Delete(':id')
    public async remove(@Param('id', ParseIdPipe) id: number): Promise<boolean> {
        return this.orderService.removeOrder(id);
    }

    @Put('/cancel/:orderId')
    public async cancelOrder(@Param('orderId', ParseIdPipe) orderId: number): Promise<OrderSerializer> {
        return this.orderService.cancelOrder(orderId);
    }
}
