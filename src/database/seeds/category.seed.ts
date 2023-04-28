import { Seeder } from 'nestjs-seeder';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../../modules/category/schemas/category.schema';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { CreateCategoryDto } from '../../modules/category/dto/create-category.dto';

export class CategorySeeder implements Seeder {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}
  async seed(): Promise<any> {
    const jsonString = fs.readFileSync('D:\\Github\\nestjs-mongo\\data\\category.json', 'utf8');
    const jsonData = JSON.parse(jsonString);
    const categories = jsonData.map((json) => {
      const category: CreateCategoryDto = {
        description: json.description,
        icon: json.icon,
        name: json.name,
        sharedUrl: json.shared_url,
        slug: json.slug,
        thumbnail: json.thumbnail,
      }

      return category;
    });


  }
}