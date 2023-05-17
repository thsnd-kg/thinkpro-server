import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop({ required: false, unique: true })
  id?: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  sharedUrl: string;

  @Prop({ required: true })
  slug: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
