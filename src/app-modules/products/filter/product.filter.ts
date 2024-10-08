import { BaseFilter } from '@snapSystem/flters/Base.filter';
import {Equal, In, Like, SelectQueryBuilder} from 'typeorm';
import {ProductEntity} from "@models/product/product.entity";

export class ProductFilter extends BaseFilter<ProductEntity> {
    public constructor(builder: SelectQueryBuilder<ProductEntity>) {
        super(builder);
    }

    public title(title = ''): void {
        if (title != '') {
            this.builder.andWhere({ title: Like(`%${title}%`) });
        }
    }

    public platformType(type = ''): void {
        const platformTypes = type.split('|').filter((type) => type.trim() !== '');
        if (platformTypes.length>0) {
            this.builder.andWhere({ platformType: In(platformTypes) });
        }
    }

    public categoryId(id = ''): void {
        if (id != '') {
            this.builder.andWhere({ categoryId: Equal(id) });
        }
    }
}
