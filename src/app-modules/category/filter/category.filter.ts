import {BaseFilter} from "@snapSystem/flters/Base.filter";
import {CategoryEntity} from "@models/category/category.entity";
import {Like, SelectQueryBuilder} from "typeorm";

export class CategoryFilter extends BaseFilter<CategoryEntity> {
    public constructor(builder: SelectQueryBuilder<CategoryEntity>) {
        super(builder);
    }

    public title(title = ''): void {
        if (title != '') {
            this.builder.andWhere({title: Like(`%${title}%`)});
        }
    }
}