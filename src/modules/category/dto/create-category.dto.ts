import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsLowerCaseKebabCase } from '../../../validations/is-lower-kebab-case.validation';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ required: false, type: Number })
  id: number;

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

  @IsOptional()
  @ApiProperty()
  thumbnail: string;
}
