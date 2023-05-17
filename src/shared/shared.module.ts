import { Module } from '@nestjs/common';
import { CategoryModule } from '../modules/category/category.module';
import { BrandModule } from '../modules/brand/brand.module';
import { ProductModule } from '../modules/product/product.module';
@Module({
  imports: [CategoryModule, BrandModule, ProductModule],
  exports: [CategoryModule, BrandModule, ProductModule],
})
export class SharedModule {}
