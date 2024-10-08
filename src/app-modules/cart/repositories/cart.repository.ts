import {BaseRepository} from '@snapSystem/repository/base.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {BaseFilter} from '@snapSystem/flters/Base.filter';
import {OrderEntity} from "@models/order/order.entity";
import {ProductOrderRepository} from "@appModules/order/repositories/product-order.repository";
import {OrderStatusEnum} from "@common/enum/order-status.enum";
import {CreateOrderDto} from "@appModules/order/dto/create-order.dto";
import {OrderSerializer} from "@models/order/order-serializer";
import {SnapBadRequestException} from "@snapSystem/exceptions/snap-bad-request.exception";
import {ProductRepository} from "@appModules/products/repositories/product.repository";
import {CreateCartDto} from "@appModules/cart/dto/create-cart.dto";
import {SnapNotFoundException} from "@snapSystem/exceptions/snap-not-found.exception";
import {CartFilter} from "@appModules/cart/filter/cart.filter";
import {QueryParamsDto} from "@snapSystem/base-entity/dto/query-params.dto";

export class CartRepository extends BaseRepository<
    OrderEntity,
    OrderSerializer
> {
    public constructor(@InjectRepository(OrderEntity) repo: Repository<OrderEntity>,
                       @InjectRepository(ProductOrderRepository)
                       private productOrderRepository: ProductOrderRepository,
                       @InjectRepository(ProductRepository)
                       private productRepository: ProductRepository) {
        super(repo.target, repo.manager, repo.queryRunner);
    }


    protected transform(model: OrderEntity): OrderSerializer {
        return plainToInstance(OrderSerializer, instanceToPlain(model));
    }

    protected getFilter(
        builder: SelectQueryBuilder<OrderEntity>,
    ): BaseFilter<OrderEntity> {
        return new CartFilter(builder);
    }

    protected onBeforeResult(builder: SelectQueryBuilder<OrderEntity>): void {
    }

    public async getCartItems(userId: number, queryParams?: QueryParamsDto): Promise<any> {
        return this.findOne({
            where: {orderBy: userId, status: OrderStatusEnum.InCart},
            select: {products: {id: true, title: true, thumbnailUrl: true, price: true, currency: true}},
            relations: ['products']
        });
    }

    public async createOrder(createOrderDto: CreateCartDto): Promise<OrderSerializer> {
        const product = await this.productRepository.getOneProductDetailOrFail(createOrderDto.productId);
        createOrderDto.totalPrice = product.price * createOrderDto.quantity;
        const createProductOrderDto = {...createOrderDto};
        let order = await this.checkOrderAndProductInCart(createOrderDto);
        if (!order) {
            order = await this.createEntity(createOrderDto).then();
        }
        await this.productOrderRepository.createEntity({...createProductOrderDto, orderId: order.id});
        return this.getCartItems(createOrderDto.orderBy);
    }

    public async checkOrderAndProductInCart(createOrderDto: CreateOrderDto): Promise<OrderSerializer | null> {
        let order = await this.findOne({
            where: {
                orderBy: createOrderDto.orderBy, status: OrderStatusEnum.InCart,
            },
        })
        if (order) {
            const existingProductOrder = await this.productOrderRepository.findOne({
                where: {
                    orderId: order.id,
                    productId: createOrderDto.productId
                }
            })
            if (existingProductOrder) {
                throw new SnapBadRequestException("You've already added this item to your cart.");
            }
        }
        return order;
    }

    public async removeProductFromOrder(orderId: number, productId: number): Promise<boolean> {
        await this.findOrFail(orderId).catch(_ => {
            return Promise.reject(new SnapNotFoundException("The order you are looking for was not found."))
        });
        return await this.productOrderRepository.findOneOrFail({where: {orderId, productId}}).then(async res => {
            await this.productOrderRepository.remove(res);
            return Promise.resolve(true);
        }).catch(_ => {
            return Promise.reject(new SnapNotFoundException('The product you are looking for was not found in your cart.'))
        })
    }
}
