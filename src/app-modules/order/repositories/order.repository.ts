import {BaseRepository} from '@snapSystem/repository/base.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {BaseFilter} from '@snapSystem/flters/Base.filter';
import {OrderEntity} from "@models/order/order.entity";
import {OrderFilter} from "@appModules/order/filter/order.filter";
import {OrderSerializer} from "@models/order/order-serializer";

export class OrderRepository extends BaseRepository<
    OrderEntity,
    OrderSerializer
> {
    public constructor(@InjectRepository(OrderEntity) repo: Repository<OrderEntity>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }


    protected transform(model: OrderEntity): OrderSerializer {
        return plainToInstance(OrderSerializer, instanceToPlain(model));
    }

    protected getFilter(
        builder: SelectQueryBuilder<OrderEntity>,
    ): BaseFilter<OrderEntity> {
        return new OrderFilter(builder);
    }

    protected onBeforeResult(builder: SelectQueryBuilder<OrderEntity>): void {
    }
}
