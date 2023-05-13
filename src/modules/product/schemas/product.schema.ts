import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Brand, BrandSchema } from '../../brand/schemas/brand.schema';
import { Color, ColorSchema } from './color.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  skuId: number;

  @Prop()
  productId: number;

  @Prop()
  categoryId: number;

  @Prop()
  sharedUrl: string;

  @Prop()
  slug: string;

  @Prop()
  image: string;

  @Prop()
  name: string;

  @Prop({ type: BrandSchema })
  brand: Brand;

  @Prop({ type: [ColorSchema], required: true })
  colors: Color[];

  @Prop()
  price: number;

  @Prop({ type: [String] })
  modelValue: string[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);
