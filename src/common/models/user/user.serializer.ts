import {PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntitySerializer } from "@snapSystem/base-entity/serializer/base-entity.serializer";
import {UserStatusEnum} from "@common/enum/user-status.enum";
import {Exclude} from "class-transformer";

export class UserSerializer extends BaseEntitySerializer {
  @PrimaryGeneratedColumn()
  public id: number;
  public firstName: string;
  public lastName: string;
  public fullName: string;
  public name: string;
  public email: string;
  @Exclude({toPlainOnly:true})
  public password: string;
  @Exclude({ toPlainOnly: true })
  public emailVerifiedAt: Date;
  @Exclude({ toPlainOnly: true })
  public isLocked: boolean;
  public avatar: string;
  public status: UserStatusEnum;
  public address: string;
  public username: string;
  public biography: string;
}
