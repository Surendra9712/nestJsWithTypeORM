import { Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserRepository} from "./repositories/user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "@models/user/user.entity";
import {OrderEntity} from "@models/order/order.entity";
import {IsUniqueConstraint} from "@snapSystem/validators/unique.validator";
import {Reflector} from "@nestjs/core";
import {AccessTokenEntity} from "@models/auth/access-token.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity,AccessTokenEntity])],
    controllers: [UserController],
    providers: [UserService, UserRepository, IsUniqueConstraint,Reflector,]
})
export class UserModule {
}
