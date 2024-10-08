import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '@snapSystem/base-entity/dto/page-meta.dto';

export class PageResultDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly page: PageMetaDto;

  constructor(data: T[], pageMeta: PageMetaDto) {
    this.data = data;
    this.page = pageMeta;
  }
}
