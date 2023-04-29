import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CategorySeeder } from '../modules/category/seeds/category.seed';
import { SharedModule } from './shared.module';
import { BrandSeeder } from '../modules/brand/seeds/brand.seed';

@Module({
  imports: [SharedModule, CommandModule],
  providers: [CategorySeeder, BrandSeeder],
  exports: [CategorySeeder, BrandSeeder],
})
export class SeedModule {}
