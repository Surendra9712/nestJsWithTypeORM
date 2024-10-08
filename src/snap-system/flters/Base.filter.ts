import { QueryParamsDto } from '@snapSystem/base-entity/dto/query-params.dto';
import { SelectQueryBuilder } from 'typeorm';

export abstract class BaseFilter<T> {
  protected constructor(protected builder: SelectQueryBuilder<T>) {}

  public applyFilter(filterOptions: QueryParamsDto): void {
    // Creating an instance for filter
    for (const key in filterOptions) {
      if (filterOptions.hasOwnProperty(key)) {
        if (typeof this[key] === 'function') {
          this[key](filterOptions[key]);
        }
      }
    }
  }
}
