import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { API_BEARER_AUTH } from '../../common/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilter } from './dto/product-filter.dto';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { ProductDetailService } from './product-detail.service';
import { JwtAuthGuard } from '../auth/guards';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService,
              private readonly productDetailService: ProductDetailService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/details')
  createProductDetail(@Body() createProductDto: CreateProductDetailDto) {
    return this.productDetailService.createProductDetail(createProductDto);
  }

  @Get('/details')
  getProductDetailBySlug(@Query('SKU') sku: string) {
    return this.productDetailService.getProductDetailBySKU(sku);
  }

  @Get()
  getProductsByFilter(@Query() query: ProductFilter) {
    return this.productService.getProductsByFilter(query);
  }

}
