import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Category } from './schemas/category.schema';
import { API_BEARER_AUTH } from '../../common/constants';
import { JwtAuthGuard } from '../auth/guards';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':identifier')
  getCategoryBySlugOrId(@Param('identifier') identifier: string): Promise<Category> {
    return this.categoryService.getCategoryBySlugOrId(identifier);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
