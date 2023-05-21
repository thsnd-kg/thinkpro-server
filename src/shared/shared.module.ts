import { Module } from '@nestjs/common';
import { CategoryModule } from '../modules/category/category.module';
import { BrandModule } from '../modules/brand/brand.module';
import { ProductModule } from '../modules/product/product.module';
import { UserModule } from '../modules/user/user.module';
@Module({
  imports: [CategoryModule, BrandModule, ProductModule, UserModule],
  exports: [CategoryModule, BrandModule, ProductModule, UserModule],
})
export class SharedModule {}
