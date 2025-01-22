import {Injectable} from '@nestjs/common';
import {BaseService} from "@snapSystem/service/base.service";
import {InjectRepository} from "@nestjs/typeorm";
import {CartRepository} from "@appModules/cart/repositories/cart.repository";
import {CreateCartDto} from "@appModules/cart/dto/create-cart.dto";
import {OrderSerializer} from "@models/order/order-serializer";

@Injectable()
export class CartService extends BaseService {
    constructor(@InjectRepository(CartRepository)
                private cartRepository: CartRepository) {
        super(cartRepository);
    }

    public async getCartItems(userId:number):Promise<OrderSerializer> {
        return this.cartRepository.getCartItems(userId)
    }

    public async createOrder(createCartDto: CreateCartDto):Promise<OrderSerializer> {
        return this.cartRepository.createOrder(createCartDto);
    }

    public async removeProductFromOrder(orderId:number,productId:number){
        return this.cartRepository.removeProductFromOrder(orderId,productId);
    }

    public async removeCartItem(orderId:number){
        return this.cartRepository.removeCartItem(orderId);
    }
}
