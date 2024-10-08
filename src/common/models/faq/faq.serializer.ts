import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";

export class FaqSerializer extends BaseEntitySerializer {
    public id: number
    public question: string;
    public answer: string;
}