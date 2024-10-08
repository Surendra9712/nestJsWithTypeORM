import {BaseRepository} from '@snapSystem/repository/base.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {BaseFilter} from '@snapSystem/flters/Base.filter';
import {ProductEntity} from "@models/product/product.entity";
import {ProductSerializer} from "@models/product/product.serializer";
import {ProductFilter} from "@appModules/products/filter/product.filter";
import {isNullOrUndefined} from "@snapSystem/helpers/helpers";
import {QueryParamsDto} from "@snapSystem/base-entity/dto/query-params.dto";
import {SnapNotFoundException} from "@snapSystem/exceptions/snap-not-found.exception";

export class ProductRepository extends BaseRepository<
    ProductEntity,
    ProductSerializer
> {
    protected sortByFields = {
        createdAt: 'createdAt',
        title: 'title',
        price:'price'
    };
    public constructor(@InjectRepository(ProductEntity) repo: Repository<ProductEntity>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }



    protected transform(model: ProductEntity): ProductSerializer {
        return plainToInstance(ProductSerializer, instanceToPlain(model));
    }

    protected getFilter(
        builder: SelectQueryBuilder<ProductEntity>,
    ): BaseFilter<ProductEntity> {
        return new ProductFilter(builder);
    }

    protected onBeforeResult(builder: SelectQueryBuilder<ProductEntity>): void {
    }

    public async getProductList(queryParams: QueryParamsDto) {
        if (isNullOrUndefined(queryParams)) {
            queryParams = new QueryParamsDto();
        }
        const queryBuilder = this.applyQueryParams(queryParams);
        queryBuilder.leftJoin('model.category', 'category');
        queryBuilder.addSelect(['category.title', 'category.id']);
        this.onBeforeResult(queryBuilder);
        return this.paginateAndSerialize(queryParams, queryBuilder);
    }

    public async getOneProductDetailOrFail(id: number) {
        return this.findOrFail(id, {
            select: {category: {id: true, title: true}},
            relations: ['category']
        }).then((entity: ProductEntity) => {
            return Promise.resolve(entity ? this.transform(entity) : null)
        }).catch(err => {
            return Promise.reject(new SnapNotFoundException('The product you are looking for was not found.'));
        });
    }
}
