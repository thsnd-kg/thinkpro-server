import { Module } from '@nestjs/common';
import { CategoryModule } from '../modules/category/category.module';
import { BrandModule } from '../modules/brand/brand.module';
@Module({
  imports: [CategoryModule, BrandModule],
  exports: [CategoryModule, BrandModule],
})
export class SharedModule {}
