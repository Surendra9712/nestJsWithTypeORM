import { BaseFilter } from '@snapSystem/flters/Base.filter';
import { Like, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from "@models/user/user.entity";

export class UserFilter extends BaseFilter<UserEntity> {
  public constructor(builder: SelectQueryBuilder<UserEntity>) {
    super(builder);
  }

  public keyword(word = ''): void {
    if (word != '') {
      this.builder.andWhere([{ email: Like(`%${word}%`) },{ fullName: Like(`%${word}%`) }]);
    }
  }
}
