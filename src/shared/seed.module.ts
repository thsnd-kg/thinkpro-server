import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CategorySeeder } from '../modules/category/seeds/category.seed';
import { SharedModule } from './shared.module';
import { BrandSeeder } from '../modules/brand/seeds/brand.seed';
import { ProductSeeder } from '../modules/product/seeds/product.seed';

@Module({
  imports: [SharedModule, CommandModule],
  providers: [CategorySeeder, BrandSeeder, ProductSeeder],
  exports: [CategorySeeder, BrandSeeder, ProductSeeder],
})
export class SeedModule {}
