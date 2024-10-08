import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../snap-system/base-entity/base-entity";

@Entity('product_orders')
export class ProductOrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name:'product_id',type:'integer',unsigned:true})
    public productId: number;

    @Column({name:'order_id',type:'integer',unsigned:true})
    public orderId: number;

    @Column({name:'quantity',type:'integer',unsigned:true})
    public quantity: number;

    @Column({name:'total_price',type:'decimal',precision:10,scale:2})
    public totalPrice: number;
}