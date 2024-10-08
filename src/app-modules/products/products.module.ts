import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {ProductRepository} from "@appModules/products/repositories/product.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductEntity} from "@models/product/product.entity";
import {CategoryEntity} from "@models/category/category.entity";
import {AssetEntity} from "@models/product/asset.entity";
import {OrderEntity} from "@models/order/order.entity";

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,CategoryEntity,AssetEntity,OrderEntity])],
  controllers: [ProductsController],
  providers: [ProductsService,ProductRepository]
})
export class ProductsModule {}
