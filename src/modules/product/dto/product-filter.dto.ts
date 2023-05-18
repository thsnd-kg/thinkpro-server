import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min, Validate, ValidateIf } from 'class-validator';
import { IsLowerCaseKebabCase } from '../../../validations/is-lower-kebab-case.validation';
import { Type } from 'class-transformer';

export class ProductFilter {

  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number, default: 1, minimum: 1 })
  currentPage: number;

  @Max(20)
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number, default: 20, maximum: 20 })
  perPage: number;

  @IsOptional()
  @IsLowerCaseKebabCase()
  @ApiPropertyOptional({ type: String })
  category?: string;

  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number, minimum: 0 })
  minPrice?: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number, minimum: 0 })
  maxPrice?: number;
}