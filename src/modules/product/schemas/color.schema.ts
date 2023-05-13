import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ColorDocument = HydratedDocument<Color>;

@Schema()
export class Color {

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  code: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);