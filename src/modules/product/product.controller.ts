import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { API_BEARER_AUTH } from '../../common/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilter } from './dto/product-filter.dto';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { ProductDetailService } from './product-detail.service';
import { JwtAuthGuard } from '../auth/guards';
import { Product } from './schemas/product.schema';
import { ProductDetail } from './schemas/product-detail.schema';
import { ProductsWithMeta } from './types/product.type';

@ApiBearerAuth(API_BEARER_AUTH)
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productDetailService: ProductDetailService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/details')
  createProductDetail(@Body() createProductDto: CreateProductDetailDto): Promise<ProductDetail> {
    return this.productDetailService.createProductDetail(createProductDto);
  }

  @Get('/details')
  getProductDetailBySlug(@Query('skuId', ParseIntPipe) skuId: number): Promise<ProductDetail> {
    return this.productDetailService.getProductDetailBySkuId(skuId);
  }

  @Get()
  getProductsByFilter(
    @Query(new ValidationPipe({ transform: true })) query: ProductFilter,
  ): Promise<ProductsWithMeta> {
    return this.productService.getProductsByFilter(query);
  }
}
