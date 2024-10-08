import {
  AfterInsert,
  AfterLoad, AfterUpdate,
  Column,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../../../snap-system/base-entity/base-entity';
import {AssetEntity} from "./asset.entity";
import {CategoryEntity} from "../category/category.entity";
import {IsOptional} from "class-validator";
import {PlatformTypeEnum} from "../../enum/platform-type.enum";
import {OrderEntity} from "../order/order.entity";

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'title', length: 250, type:'varchar'})
  public title: string;

  @Column({ name: 'price', type: 'decimal',precision:10,scale:2 })
  public price: number;

  @Column({ name: 'currency', length: 50, type: 'varchar' })
  public currency: string;

  @Column({ name: 'description', type: 'text'})
  public description: string;

  @Column({ name: 'tags', type: 'varchar' })
  public tags: string;

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.products)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  public category: CategoryEntity;

  @Column({ name: 'category_id', type: 'integer' })
  public categoryId: number;

  @OneToMany(() => AssetEntity, media => media.product, { cascade: true })
  public medias: AssetEntity[];

  @Column({name:'thumbnail_url',type:'varchar',length:'250'})
  public thumbnailUrl: string;

  @Column({name:'platform_type',type:'tinyint',unsigned:true})
  public platformType: PlatformTypeEnum;

  @IsOptional()
  public productTags:Array<string>;


  @ManyToMany(() => OrderEntity)
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
  public orders: OrderEntity[];

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  generateTags(){
      return this.productTags = this.tags?.split('|');
  }
}
