import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CreateBrandDto } from '../brand/dto/create-brand.dto';
import * as path from 'path';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class BrandSeeder {
  constructor(private readonly brandService: BrandService) {}

  @Command({ command: 'seed:brands', describe: 'create brands' })
  async seed(): Promise<any> {
    console.log('Seeding brands ...');
    const jsonString = fs.readFileSync(path.join(process.cwd(), 'data/brand.json'), 'utf8');
    const jsonData = JSON.parse(jsonString);
    const brands = jsonData.map(json => {
      const brand: CreateBrandDto = {
        id: json.id,
        description: json.description,
        icon: json.icon,
        name: json.name,
        sharedUrl: json.shared_url,
        slug: json.slug,
        parentId: json.parent_id ?? null,
      };
      return this.brandService.createBrand(brand);
    });
    console.log('Seeding brands successfully!!');

    return Promise.all(brands);
  }

  @Command({ command: 'drop:brands', describe: 'drop brands' })
  async drop(): Promise<any> {
    console.log('Dropping brands ...');
    await this.brandService.deleteAll();
    console.log('Dropping brands successfully!!');
  }
}
