import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH } from '../../common/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilter } from './dto/product-filter.dto';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  getProductsByFilter(@Query() query: ProductFilter) {
    return this.productService.getProductsByFilter(query);
  }

}
