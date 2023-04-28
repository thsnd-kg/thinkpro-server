import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsLowerCaseKebabCase } from '../../../validations/is-lower-kebab-case.validation';
import { Expose } from 'class-transformer';

export class CreateCategoryDto {

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
