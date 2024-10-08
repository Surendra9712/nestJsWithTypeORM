import {
    AfterInsert,
    AfterLoad, AfterUpdate,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { BaseEntity } from '../../../snap-system/base-entity/base-entity';
import {UserEntity} from "../user/user.entity";
import {ProductEntity} from "../product/product.entity";
import {OrderStatusEnum} from "../../enum/order-status.enum";
import {IsOptional} from "class-validator";

@Entity('orders')
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    @JoinColumn({ name: 'order_by', referencedColumnName: 'id' })
    public user: UserEntity;

    @Column({ name: 'order_by', type: 'integer' })
    public orderBy: number;

    @Column({ name: 'status', type: 'tinyint',unsigned:true,default:OrderStatusEnum.InCart })
    public status: OrderStatusEnum;

    @ManyToMany(() => ProductEntity)
    @JoinTable({
        name: 'product_orders',
        joinColumn: {
            name: 'order_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
        },
    })
    public products: ProductEntity[];

    @IsOptional()
    totalPrice:number

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    calculateTotalPrice(){
        if (this.products?.length) {
            this.totalPrice = Number(this.products.reduce((total, product) => total + Number(product.price), 0).toFixed(2));
        }
    }
}