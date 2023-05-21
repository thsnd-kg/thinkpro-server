import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: false, type: Number })
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

  @Prop()
  thumbnail: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
