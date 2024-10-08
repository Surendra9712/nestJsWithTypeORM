import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";

export class AccessTokenSerializer extends BaseEntitySerializer {
    public id: number
    public tokenId: string
    public userId: number
    public revoked: boolean
    public expiresAt: Date
}