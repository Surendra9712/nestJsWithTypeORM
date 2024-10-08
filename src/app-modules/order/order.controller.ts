import {Controller} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {OrderService} from "@appModules/order/order.service";

@Controller('api')
@ApiTags('Orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

}
