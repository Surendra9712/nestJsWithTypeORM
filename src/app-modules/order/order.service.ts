import {Injectable} from '@nestjs/common';
import {BaseService} from "@snapSystem/service/base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderRepository} from "@appModules/order/repositories/order.repository";
import {OrderSerializer} from "@models/order/order-serializer";

@Injectable()
export class OrderService extends BaseService {
    constructor(@InjectRepository(OrderRepository)
                private orderRepository: OrderRepository) {
        super(orderRepository);
    }

    public async getOrderItems(userId:number):Promise<OrderSerializer> {
        return this.orderRepository.getOrderItems(userId)
    }

    public async cancelOrder(id:number):Promise<OrderSerializer> {
        return this.orderRepository.cancelOrder(id);
    }

    public async removeOrder(id:number):Promise<boolean> {
        return this.orderRepository.removeOrder(id);
    }
}
