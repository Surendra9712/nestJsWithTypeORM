import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Order } from '@snapSystem/enums/order.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryParamsDto {
  @ApiPropertyOptional()
  // @IsInt()
  @IsOptional()
  // @Min(0)
  readonly page?: number = 1;

  @ApiPropertyOptional()
  // @IsInt()
  @IsOptional()
  readonly perPage?: number = 100;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly sort?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsEnum(Order)
  sortOrder?: Order = Order.ASC;
}
