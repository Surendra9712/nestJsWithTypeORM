import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ProductsModule } from './products/products.module';
import {UploaderModule} from "./uploader/uploader.module";
import { CategoryModule } from './category/category.module';
import {CartModule} from "@appModules/cart/cart.module";
import {OrderModule} from "@appModules/order/order.module";

@Module({
  imports: [ConfigModule, AuthModule, UserModule, ProductsModule,UploaderModule, CategoryModule,CartModule,OrderModule],
  controllers: [],
  providers: [],
})
export class AppModulesModule {}
