import { Product } from '../schemas/product.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateProductDetailDto {
  @ApiProperty()
  @IsOptional()
  SKU: string;

  @ApiProperty()
  @IsOptional()
  assets: {
    src: string;
    type: string;
  }[];

  @ApiProperty()
  @IsOptional()
  variations: {
    label: string;
    name: string;
    options: {
      name: string;
    }[];
  }[];

  @ApiProperty()
  @IsOptional()
  productId: number;

  @ApiProperty()
  @IsOptional()
  attributes: {
    items: {
      label: string;
      value: string;
      article: string;
    }[];
    groupName: string;
  }[];

  @ApiProperty({})
  @IsOptional()
  article: {
    title: string;
    description: string;
    content: string;
  };
}
