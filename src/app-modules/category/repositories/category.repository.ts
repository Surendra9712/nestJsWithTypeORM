import {BaseRepository} from "@snapSystem/repository/base.repository";
import {CategoryEntity} from "@models/category/category.entity";
import {CategorySerializer} from "@models/category/category.serializer";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, SelectQueryBuilder} from "typeorm";
import {BaseFilter} from "@snapSystem/flters/Base.filter";
import {CategoryFilter} from "@appModules/category/filter/category.filter";
import {instanceToPlain, plainToInstance} from "class-transformer";

export class CategoryRepository extends BaseRepository<CategoryEntity, CategorySerializer>{
    constructor(@InjectRepository(CategoryEntity) repo:Repository<CategoryEntity>) {
        super(repo.target,repo.manager,repo.queryRunner);
    }

    protected getFilter(builder: SelectQueryBuilder<CategoryEntity>): BaseFilter<CategoryEntity> {
            return new CategoryFilter(builder);
    }

    protected onBeforeResult(builder: SelectQueryBuilder<CategoryEntity>): void {
    }

    protected transform(model: CategoryEntity): CategorySerializer {
        return plainToInstance(CategorySerializer, instanceToPlain(model));
    }

}