import { IsString } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class CreateColorDto {
  @Prop({ required: true, type: String })
  @IsString()
  name: string;

  @Prop({ required: true, type: String })
  @IsString()
  code: string;
}
