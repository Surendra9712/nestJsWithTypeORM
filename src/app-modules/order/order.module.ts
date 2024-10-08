import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {OrderRepository} from "@appModules/order/repositories/order.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "@models/order/order.entity";
import {ProductEntity} from "@models/product/product.entity";
import {ProductOrderEntity} from "@models/order/product-order.entity";
import {ProductOrderRepository} from "@appModules/order/repositories/product-order.repository";

@Module({
  imports:[TypeOrmModule.forFeature([OrderEntity,ProductEntity,ProductOrderEntity])],
  controllers: [OrderController],
  providers: [OrderService,OrderRepository,ProductOrderRepository]
})
export class OrderModule {}
