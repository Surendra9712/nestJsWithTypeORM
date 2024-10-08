import {BaseRepository} from '@snapSystem/repository/base.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {BaseFilter} from '@snapSystem/flters/Base.filter';
import {ProductOrderSerializer} from "@models/order/product-order-serializer";
import {ProductOrderEntity} from "@models/order/product-order.entity";
import {ProductOrderFilter} from "@appModules/order/filter/product-order.filter";

export class ProductOrderRepository extends BaseRepository<
    ProductOrderEntity,
    ProductOrderSerializer
> {
    public constructor(@InjectRepository(ProductOrderEntity) repo: Repository<ProductOrderEntity>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    protected transform(model: ProductOrderEntity): ProductOrderSerializer {
        return plainToInstance(ProductOrderSerializer, instanceToPlain(model));
    }

    protected getFilter(
        builder: SelectQueryBuilder<ProductOrderEntity>,
    ): BaseFilter<ProductOrderEntity> {
        return new ProductOrderFilter(builder);
    }

    protected onBeforeResult(builder: SelectQueryBuilder<ProductOrderEntity>): void {
    }
}
