import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../snap-system/base-entity/base-entity";
import {ProductEntity} from "../product/product.entity";

@Entity('categories')
export class CategoryEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id:number;

    @Column({name:"title",type:'varchar', length:100})
    public title:string;

    @Column({name:"description",type:'varchar',length:'500'})
    public description:string;

    @OneToMany(() => ProductEntity, (product: ProductEntity) => product.category)
    public products: ProductEntity[];
}