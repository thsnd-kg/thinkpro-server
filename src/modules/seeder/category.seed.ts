import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import * as path from 'path';
import * as process from 'process';

@Injectable()
export class CategorySeeder {
  constructor(private readonly categoryService: CategoryService) {}

  @Command({ command: 'seed:categories', describe: 'create categories' })
  async seed(): Promise<any> {
    console.log('Seeding categories ...');

    const jsonString = fs.readFileSync(path.join(process.cwd(), 'data/category.json'), 'utf8');
    const jsonData = JSON.parse(jsonString);
    const categories = jsonData.map(json => {
      const category: CreateCategoryDto = {
        id: json.id,
        description: json.description,
        icon: json.icon,
        name: json.name,
        sharedUrl: json.shared_url,
        slug: json.slug,
        thumbnail: json.thumbnail,
      };
      return this.categoryService.createCategory(category);
    });
    console.log('Seeding categories successfully!!');

    return Promise.all(categories);
  }

  @Command({ command: 'drop:categories', describe: 'drop categories' })
  async drop(): Promise<any> {
    console.log('Dropping categories ...');
    await this.categoryService.deleteAll();
    console.log('Dropping categories successfully!!');
  }
}
