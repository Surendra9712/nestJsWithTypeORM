import { IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from '@snapSystem/base-entity/dto/query-params.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserParamsDto extends QueryParamsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly keyword: string;
}
