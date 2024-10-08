import { BaseFilter } from '@snapSystem/flters/Base.filter';
import { SelectQueryBuilder } from 'typeorm';
import {AccessTokenEntity} from "@models/auth/access-token.entity";

export class AuthFilter extends BaseFilter<AccessTokenEntity> {
  public constructor(builder: SelectQueryBuilder<AccessTokenEntity>) {
    super(builder);
  }
}
