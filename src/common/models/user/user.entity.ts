import {AfterInsert, AfterLoad, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { BaseEntity } from '../../../snap-system/base-entity/base-entity';
import {UserStatusEnum} from "../../enum/user-status.enum";
import {OrderEntity} from "../order/order.entity";
import {IsOptional} from "class-validator";
import {AccessTokenEntity} from "../auth/access-token.entity";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'avatar', length: 250, type:'varchar',nullable:true})
  public avatar: string;

  @Column({ name: 'first_name', length: 100, type: 'varchar' })
  public firstName: string;

  @Column({ name: 'last_name', length: 100, type: 'varchar' })
  public lastName: string;

  @Column({ name: 'email', length: 50, type: 'varchar' })
  public email: string;

  @Column({ name: 'password', length: 250, type: 'varchar' })
  public password: string;

  @Column({ name: 'status', type: 'tinyint',unsigned:true,default:UserStatusEnum.Active })
  public status: UserStatusEnum;

  @Column({ name: 'address', length: 250, type: 'varchar',nullable:true })
  public address: string;

  @Column({ name: 'biography', type: 'text',nullable:true })
  public biography: string;

  @Column({ name: 'username', type: 'varchar',length:50,nullable:true })
  public username: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  public orders: OrderEntity[];

  @OneToMany(()=>AccessTokenEntity,(token) => token.user)
  public accessTokens: AccessTokenEntity[];

  @Column({
    nullable: true,
    name: 'email_verified_at',
    type: 'datetime',
  })
  public emailVerifiedAt: Date;

  @Column({ name: 'is_locked', type: 'boolean',default:true })
  public isLocked: boolean;

  @IsOptional()
  fullName:string

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  generateFullName(){
    return this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
