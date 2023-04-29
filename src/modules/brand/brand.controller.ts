import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH } from '../../common/constants';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { BrandService } from './brand.service';
import { Brand } from './schemas/brand.schema';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  getAllBrands(): Promise<Brand[]> {
    return this.brandService.getBrands();
  }

  @Get(':identifier')
  getBrandBySlugOrId(@Param('identifier') identifier: string): Promise<Brand> {
    return this.brandService.getBrandBySlugOrId(identifier);
  }
  @Post()
  createBrand(@Body() createCategoryDto: CreateCategoryDto): Promise<Brand> {
    return this.brandService.createBrand(createCategoryDto);
  }

}