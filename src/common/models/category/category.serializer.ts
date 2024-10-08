import {ProductEntity} from "../product/product.entity";
import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";

export class CategorySerializer extends BaseEntitySerializer{
    public id:number;
    public title:string;
    public description:string;
    public products: ProductEntity[];
}