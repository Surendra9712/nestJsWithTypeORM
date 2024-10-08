import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "@models/order/order.entity";
import {ProductEntity} from "@models/product/product.entity";
import {ProductOrderEntity} from "@models/order/product-order.entity";
import {ProductOrderRepository} from "@appModules/order/repositories/product-order.repository";
import {CartRepository} from "@appModules/cart/repositories/cart.repository";
import {ProductRepository} from "@appModules/products/repositories/product.repository";

@Module({
  imports:[TypeOrmModule.forFeature([OrderEntity,ProductEntity,ProductOrderEntity])],
  controllers: [CartController],
  providers: [CartService,CartRepository,ProductOrderRepository,ProductRepository]
})
export class CartModule {}
