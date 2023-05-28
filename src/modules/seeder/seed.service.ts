import { Injectable } from '@nestjs/common';
import { CategorySeeder } from './category.seed';
import { BrandSeeder } from './brand.seed';
import { ProductSeeder } from './product.seed';
import { UserService } from '../user/user.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly brandSeeder: BrandSeeder,
    private readonly categorySeeder: CategorySeeder,
    private readonly productSeeder: ProductSeeder,
    private readonly userService: UserService,
  ) {}

  async seed(): Promise<any> {
    const shoudSeed = await this.shouldSeed();
    if (!shoudSeed) return;
    await this.brandSeeder.seed();
    await this.categorySeeder.seed();
    await this.productSeeder.seed();

    await this.userService.create({
      username: 'admin',
      password: 'admin',
    });
  }

  async shouldSeed(): Promise<boolean> {
    const exists = await this.userService.existByUsername('admin');
    return !exists;
  }
}
