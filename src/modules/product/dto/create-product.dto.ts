import { Brand } from '../../brand/schemas/brand.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsLowerCaseKebabCase } from '../../../validations/is-lower-kebab-case.validation';
import { Type } from 'class-transformer';
import { Color } from '../schemas/color.schema';
import { CreateBrandDto } from '../../brand/dto/create-brand.dto';
import { CreateColorDto } from './create-color.dto';

export class CreateProductDto {

  @IsNumber()
  @ApiProperty({ required: false, type: Number })
  skuId: number;

  @IsNumber()
  @ApiProperty({ required: false, type: Number })
  productId: number;

  @IsNumber()
  @ApiProperty({ required: false, type: Number })
  categoryId: number;

  @IsLowerCaseKebabCase()
  @ApiProperty({ required: false, type: String })
  sharedUrl: string;

  @IsLowerCaseKebabCase()
  @ApiProperty({ required: false, type: String })
  slug: string;

  @IsOptional()
  @ApiProperty({ required: false, type: String })
  image: string;

  @IsString()
  @ApiProperty({ required: false, type: String })
  name: string;

  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  brandId: number;

  @IsArray()
  @Type(() => CreateColorDto)
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, type: [CreateColorDto] })
  colors: CreateColorDto[];

  @IsNumber()
  @ApiProperty({ required: false, type: Number })
  price: number;

  @IsArray()
  @ApiProperty({ required: false, type: [String] })
  model_value: string[];
}