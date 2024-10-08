import { ApiProperty } from '@nestjs/swagger';
import { QueryParamsDto } from '@snapSystem/base-entity/dto/query-params.dto';

export class PageMetaDto {
  @ApiProperty()
  public readonly page: number;

  @ApiProperty()
  public readonly perPage: number;

  @ApiProperty()
  public readonly itemCount: number;

  @ApiProperty()
  public readonly pageCount: number;

  @ApiProperty()
  public readonly hasPreviousPage: boolean;

  @ApiProperty()
  public readonly hasNextPage: boolean;

  constructor(pageOptionsDto: QueryParamsDto, itemCount: number) {
    this.page = pageOptionsDto.page;
    this.perPage = pageOptionsDto.perPage;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.perPage);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
