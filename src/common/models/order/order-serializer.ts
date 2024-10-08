import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";
import {OrderStatusEnum} from "@common/enum/order-status.enum";
import {ProductEntity} from "@models/product/product.entity";

export class OrderSerializer extends BaseEntitySerializer {
    public id: number;
    public orderBy: number;
    public status: OrderStatusEnum;
    public products: ProductEntity[];
}