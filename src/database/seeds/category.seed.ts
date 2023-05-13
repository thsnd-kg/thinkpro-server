import { CategoryDocument } from '../../modules/category/schemas/category.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { CreateCategoryDto } from '../../modules/category/dto/create-category.dto';
import { CategoryService } from '../../modules/category/category.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategorySeeder {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async seed(): Promise<any> {
    const jsonString = fs.readFileSync('../data/category.json', 'utf8');
    const jsonData = JSON.parse(jsonString);
    const categories = jsonData.map((json) => {
      const category: CreateCategoryDto = {
        id: json.id,
        description: json.description,
        icon: json.icon,
        name: json.name,
        sharedUrl: json.shared_url,
        slug: json.slug,
        thumbnail: json.thumbnail,
      }
      return this.categoryService.createCategory(category);
    });

    return Promise.all(categories);
  }

  async drop(): Promise<any> {
    return this.categoryModel.deleteMany();
  }
}