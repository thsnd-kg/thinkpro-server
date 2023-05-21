import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CategorySeeder } from './category.seed';
import { SharedModule } from '../../shared/shared.module';
import { BrandSeeder } from './brand.seed';
import { ProductSeeder } from './product.seed';
import { SeedService } from './seed.service';

@Module({
  imports: [SharedModule, CommandModule],
  providers: [CategorySeeder, BrandSeeder, ProductSeeder, SeedService],
  exports: [SeedService],
})
export class SeedModule {}
