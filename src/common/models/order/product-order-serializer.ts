import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";
import {UserEntity} from "@models/user/user.entity";
import {ProductEntity} from "@models/product/product.entity";

export class ProductOrderSerializer extends BaseEntitySerializer {
    public id: number;
    public quantity: number;
    public totalPrice: number;
    public productId: number;
    public orderBy: number;
    public user: UserEntity;
    public products: ProductEntity[];
}