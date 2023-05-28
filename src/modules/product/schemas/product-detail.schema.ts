import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { HydratedDocument } from 'mongoose';

export type ProductDetailDocument = HydratedDocument<ProductDetail>;

@Schema({ collection: 'product_details' })
export class ProductDetail {
  @Prop()
  SKU: string;

  @Prop({ type: [{ src: { type: String }, type: { type: String } }], _id: false })
  assets: {
    src: string;
    type: string;
  }[];

  @Prop({ type: [{ label: String, name: String, options: [{ name: String }] }], _id: false })
  variations: {
    label: string;
    name: string;
    options: {
      name: string;
    }[];
  }[];

  @Prop({ type: ProductSchema })
  model: Product;

  @Prop({
    type: [
      {
        items: [{ label: String, value: String, article: String }],
        groupName: String,
      },
    ],
    _id: false,
  })
  attributes: {
    items: {
      label: string;
      value: string;
      article: string;
    }[];
    groupName: string;
  }[];

  @Prop({
    type: { title: String, description: String, content: String },
    _id: false,
  })
  article: {
    title: string;
    description: string;
    content: string;
  };
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);
