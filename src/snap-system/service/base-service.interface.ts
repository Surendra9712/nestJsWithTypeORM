import { BaseDto } from '@snapSystem/base-entity/dto/base.dto';
import { BaseEntitySerializer } from '@snapSystem/base-entity/serializer/base-entity.serializer';
import { QueryParamsDto } from '@snapSystem/base-entity/dto/query-params.dto';
import { PageResultDto } from '@snapSystem/base-entity/dto/page-result.dto';

export interface IBaseService {
  findOrFail(id: number): Promise<BaseEntitySerializer>;

  create(createDto: BaseDto): Promise<BaseEntitySerializer>;

  findAll(
    query: QueryParamsDto,
  ): Promise<BaseEntitySerializer[] | PageResultDto<BaseEntitySerializer>>;

  update(id: number, updateDto: BaseDto): Promise<BaseEntitySerializer>;

  remove(id: number): Promise<boolean>;
}
