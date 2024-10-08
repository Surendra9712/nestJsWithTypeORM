import { BaseFilter } from '@snapSystem/flters/Base.filter';
import { SelectQueryBuilder } from 'typeorm';
import {ProductOrderEntity} from "@models/order/product-order.entity";

export class ProductOrderFilter extends BaseFilter<ProductOrderEntity> {
  public constructor(builder: SelectQueryBuilder<ProductOrderEntity>) {
    super(builder);
  }
}
