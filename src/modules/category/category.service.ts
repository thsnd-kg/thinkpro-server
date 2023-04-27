import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  // Inject the Category model
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>) {
  }

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(createCategoryDto);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async getCategoryBySlugOrId(identifier: string): Promise<Category> {
    const category: CategoryDocument = await this.categoryModel
      .findOne({ $or: [{ slug: identifier }, { _id: identifier }] })
      .exec();

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

}
