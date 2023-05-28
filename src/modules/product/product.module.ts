import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { ProductDetail, ProductDetailSchema } from './schemas/product-detail.schema';
import { ProductDetailService } from './product-detail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      { name: ProductDetail.name, schema: ProductDetailSchema },
    ]),
    BrandModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductDetailService],
  exports: [ProductService, ProductDetailService],
})
export class ProductModule {}
