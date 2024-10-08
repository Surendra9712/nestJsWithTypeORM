import { BaseEntity } from '@snapSystem/base-entity/base-entity';
import { BaseDto } from '@snapSystem/base-entity/dto/base.dto';
import { IBaseService } from '@snapSystem/service/base-service.interface';
import { BaseRepository } from '@snapSystem/repository/base.repository';
import { BaseEntitySerializer } from '@snapSystem/base-entity/serializer/base-entity.serializer';
import { QueryParamsDto } from '@snapSystem/base-entity/dto/query-params.dto';
import { PageResultDto } from '@snapSystem/base-entity/dto/page-result.dto';

export abstract class BaseService implements IBaseService {
  protected constructor(
    public repository: BaseRepository<BaseEntity, BaseEntitySerializer>,
  ) {}

  public create(createDto: BaseDto): Promise<BaseEntitySerializer> {
    return this.repository.createEntity(createDto);
  }

  public findAll(
    query: QueryParamsDto,
  ): Promise<BaseEntitySerializer[] | PageResultDto<BaseEntitySerializer>> {
    return this.repository.getAll(query);
  }

  public findOrFail(id: number): Promise<BaseEntitySerializer> {
    return this.repository.findOrFail(id);
  }

  public async update(
    id: number,
    updateDto: BaseDto,
  ): Promise<BaseEntitySerializer> {
    const entity = await this.findOrFail(id);
    return await this.repository.updateEntity(entity, updateDto);
  }

  public async remove(id: number): Promise<boolean> {
    const entity = await this.findOrFail(id);
    return await this.repository.deleteEntity(entity.id);
  }
}
