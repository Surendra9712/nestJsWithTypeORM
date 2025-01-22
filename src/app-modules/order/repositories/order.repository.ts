import {BaseRepository} from '@snapSystem/repository/base.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Not, Repository, SelectQueryBuilder} from 'typeorm';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {BaseFilter} from '@snapSystem/flters/Base.filter';
import {OrderEntity} from "@models/order/order.entity";
import {OrderFilter} from "@appModules/order/filter/order.filter";
import {OrderSerializer} from "@models/order/order-serializer";
import {OrderStatusEnum} from "@common/enum/order-status.enum";
import {SnapNotFoundException} from "@snapSystem/exceptions/snap-not-found.exception";
import {SnapBadRequestException} from "@snapSystem/exceptions/snap-bad-request.exception";

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

    public async getOrderItems(userId: number): Promise<any> {
        return this.find({
            where: {orderBy: userId, status: Not(OrderStatusEnum.InCart)},
            select: {products: {id: true, title: true, thumbnailUrl: true, price: true, currency: true}},
            relations: ['products']
        });
    }

    public async cancelOrder(orderId: number): Promise<OrderSerializer> {
        try {
            const entity = await this.findOrFail(orderId);
            switch (entity.status) {
                case OrderStatusEnum.Pending:
                    return this.updateEntity(entity, {...entity, status: OrderStatusEnum.Cancelled});
                case OrderStatusEnum.Completed:
                    throw new SnapBadRequestException("Your order has already been completed, so it cannot be canceled.");
                case OrderStatusEnum.Cancelled:
                    throw new SnapBadRequestException("Your order has already been cancelled.");
                default:
                    throw new SnapNotFoundException("The order you are looking for was not found.");
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async removeOrder(id: number): Promise<boolean> {
        try {
            const entity = await this.findOrFail(id, {where: {id, status: Not(OrderStatusEnum.InCart)}});
            if (entity.status === OrderStatusEnum.Pending) {
                throw new SnapBadRequestException("Orders in pending status cannot be removed.");
            }
            return await this.deleteEntity(id);
        } catch (err) {
            return Promise.reject(err);
        }
    }

}
