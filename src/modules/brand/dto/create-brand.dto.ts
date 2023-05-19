import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsLowerCaseKebabCase } from '../../../validations/is-lower-kebab-case.validation';

export class CreateBrandDto {
  @IsNumber()
  @ApiProperty({ required: false, type: Number })
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  description: string;

  @IsOptional()
  @ApiProperty()
  icon: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsLowerCaseKebabCase({ message: 'The sharedUrl must be in kebab-case and all lowercase' })
  @IsNotEmpty()
  @ApiProperty({ required: true })
  sharedUrl: string;

  @IsNotEmpty()
  @IsLowerCaseKebabCase({ message: 'The slug must be in kebab-case and all lowercase' })
  @ApiProperty({ required: true })
  slug: string;

  @IsNumber()
  @ApiProperty({ required: false, type: Number })
  parentId: number | null;
}
