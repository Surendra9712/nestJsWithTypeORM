import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {BaseEntity} from "../../../snap-system/base-entity/base-entity";

@Entity("access_tokens")
export class AccessTokenEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({name: "token_id", type: 'varchar', unique: true})
    public tokenId: string

    @ManyToOne(() => UserEntity, user => user.accessTokens)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    public user: UserEntity;

    @Column({name: "user_id", type: 'integer',unsigned:true})
    public userId: number

    @Column({name: "revoked", type: 'boolean',default: false})
    public revoked: boolean

    @Column({name: "expires_at", type: 'datetime'})
    public expiresAt: Date
}