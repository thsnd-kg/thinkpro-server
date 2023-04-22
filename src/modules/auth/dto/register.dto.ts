import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty({
    required: true,
    example: 'phamkhang',
  })
  @IsNotEmpty()
  @MinLength(6)
  @Transform(({ value }) => value.toLowerCase())
  readonly username: string;

  @ApiProperty({
    required: true,
    example: 'phamkhang',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
