import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../snap-system/base-entity/base-entity";
import {ProductEntity} from "./product.entity";

@Entity({name:'assets'})
export class AssetEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'title', length: 250, type:'varchar'})
    public title: string;

    @Column({ name: 'url', type: 'varchar',length:250 })
    public url: string;

    @Column({ name: 'thumbnail', length: 250, type: 'varchar' })
    public thumbnail: string;

    @Column({ name: 'type', length: 250, type: 'varchar' })
    public type: string;

    @ManyToOne(() => ProductEntity, product => product.medias)
    public product: ProductEntity;
}