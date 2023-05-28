import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import { BrandService } from '../brand/brand.service';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
    private brandService: BrandService,
  ) {}

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(createCategoryDto);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async getCategoryBySlugOrId(identifier: string | number): Promise<CategoryResponseDto> {
    if (!identifier) throw new BadRequestException('Identifier is required');

    const filter = typeof identifier === 'string' ? { slug: identifier } : { id: identifier };

    const category: CategoryDocument = await this.categoryModel.findOne(filter).exec();

    if (!category) {
      throw new Error('Category not found');
    }

    const brands = await this.brandService.getBrandsInCategory(category.slug);

    return {
      ...category.toObject(),
      brands,
    };
  }

  async deleteAll(): Promise<void> {
    await this.categoryModel.deleteMany({});
  }
}
