import { BaseEntity } from '@snapSystem/base-entity/base-entity';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { BaseEntitySerializer } from '@snapSystem/base-entity/serializer/base-entity.serializer';
import { SnapNotFoundException } from '@snapSystem/exceptions/snap-not-found.exception';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { QueryParamsDto } from '@snapSystem/base-entity/dto/query-params.dto';
import { PageResultDto } from '@snapSystem/base-entity/dto/page-result.dto';
import { PageMetaDto } from '@snapSystem/base-entity/dto/page-meta.dto';
import { BaseFilter } from '@snapSystem/flters/Base.filter';
import { isNullOrUndefined } from '@snapSystem/helpers/helpers';

export abstract class BaseRepository<
  T extends BaseEntity,
  K extends BaseEntitySerializer,
> extends Repository<T> {
  protected sortByFields: Record<string, string> = {};

  /**
   *
   * @param id
   * @param options
   */
  public async findOrFail(
    id: number,
    options?: FindOneOptions<BaseEntity>,
  ): Promise<K> {
    return await this.findOneOrFail({
      where: { id },
      ...options,
    })
      .then((entity: T) => {
        return Promise.resolve(entity ? this.transform(entity, {}) : null);
      })
      .catch(() => {
        return Promise.reject(new SnapNotFoundException('Model not found.'));
      });
  }

  public async getAll(
    query?: QueryParamsDto,
    select: string[] = [],
    relations: string[] = [],
  ): Promise<PageResultDto<K>> {
    if (isNullOrUndefined(query)) {
      query = new QueryParamsDto();
    }
    const queryBuilder = this.applyQueryParams(query);
    relations.forEach((relation: string) => {
      queryBuilder.leftJoinAndSelect('model.' + relation, relation);
    });

    if (select.length > 0) {
      queryBuilder.select(select);
    }
    this.onBeforeResult(queryBuilder);

    return this.paginateAndSerialize(query, queryBuilder);
  }

  public async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<K> {
    return this.save(inputs)
      .then(async (entity) => await this.findOrFail((entity as any).id))
      .catch((error) => Promise.reject(error));
  }

  public async updateEntity(
    entity: K,
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<K> {
    return this.update(entity.id, inputs)
      .then(async () => await this.findOrFail(entity.id))
      .catch((error) => Promise.reject(error));
  }

  public async deleteEntity(id: number): Promise<boolean> {
    return this.softDelete(id)
      .then(() => Promise.resolve(true))
      .catch((error) => Promise.reject(error));
  }

  public async first(where: FindOneOptions): Promise<K> {
    return this.findOne(where)
      .then((entity: T) => {
        return Promise.resolve(entity ? this.transform(entity, {}) : null);
      })
      .catch((error) => Promise.reject(error));
  }

  protected applyQueryParams(query: QueryParamsDto): SelectQueryBuilder<T> {
    const queryBuilder: SelectQueryBuilder<T> =
      this.createQueryBuilder('model');

    const filter: BaseFilter<T> = this.getFilter(queryBuilder);
    filter.applyFilter(query);

    if (query.sort && this.sortByFields[query.sort]) {
      queryBuilder.addOrderBy(
        'model.' + this.sortByFields[query.sort],
        query.sortOrder,
      );
    }

    if (query.page != 0) {
      const skip: number = (query.page - 1) * query.perPage;
      queryBuilder.skip(skip).take(query.perPage);
    }

    return queryBuilder;
  }

  protected async paginateAndSerialize(
    query: QueryParamsDto,
    queryBuilder: SelectQueryBuilder<T>,
  ): Promise<PageResultDto<K>> {
    const [entities, totalCount] = await queryBuilder.getManyAndCount();
    const data = entities.length > 0 ? this.transformMany(entities as T[]) : [];
    const pageMetaDto = new PageMetaDto(query, totalCount);
    return new PageResultDto(data, pageMetaDto);
  }

  protected abstract onBeforeResult(builder: SelectQueryBuilder<T>): void;

  protected abstract getFilter(builder: SelectQueryBuilder<T>): BaseFilter<T>;

  protected abstract transform(
    model: T,
    transformOptions: NonNullable<unknown>,
  ): K;

  protected transformMany(models: T[], transformOptions = {}): K[] {
    return models.map((model) => this.transform(model, transformOptions));
  }

  private parseSortOrder(
    sort: string,
    sortOrder: string,
  ): { [p: string]: 'ASC' | 'DESC' } {
    if (!sort) {
      return {}; // Return default ordering if no sort parameter provided
    }
    return { [sort]: sortOrder.toUpperCase() as 'ASC' | 'DESC' };
  }
}
