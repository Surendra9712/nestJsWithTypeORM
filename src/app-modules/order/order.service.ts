import {Injectable} from '@nestjs/common';
import {BaseService} from "@snapSystem/service/base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderRepository} from "@appModules/order/repositories/order.repository";

@Injectable()
export class OrderService extends BaseService {
    constructor(@InjectRepository(OrderRepository)
                private orderRepository: OrderRepository) {
        super(orderRepository);
    }
}
