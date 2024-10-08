import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";

export class PasswordResetSerializer {
    public id:number;

    public email: string;

    public token: string;

    public createdAt: Date;
}