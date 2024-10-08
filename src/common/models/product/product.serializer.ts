import {BaseEntitySerializer} from "@snapSystem/base-entity/serializer/base-entity.serializer";
import {CategoryEntity} from "@models/category/category.entity";
import {AssetEntity} from "@models/product/asset.entity";
import {Exclude} from "class-transformer";
import {PlatformTypeEnum} from "@common/enum/platform-type.enum";

export class ProductSerializer extends BaseEntitySerializer {
    public id: number;
    public title: string;
    public price: number;
    public currency: string;
    public description: string;
    @Exclude({toPlainOnly:true})
    public tags: string;
    public productTags: Array<string>;
    public categoryId: number;
    public category:CategoryEntity;
    public medias:AssetEntity[];
    public thumbnailUrl: string;
    public platformType: PlatformTypeEnum;
}
