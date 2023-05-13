import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { BrandModule } from '../brand/brand.module';
import { Color, ColorSchema } from './schemas/color.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }]),
    BrandModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {
}
