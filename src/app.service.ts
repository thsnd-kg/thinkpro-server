import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { SeedService } from './modules/seeder/seed.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly seedService: SeedService) {}

  async onApplicationBootstrap(): Promise<any> {
    await this.seedService.seed();
  }
}
