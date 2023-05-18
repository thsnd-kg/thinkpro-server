import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BrandService } from '../brand/brand.service';
import { ProductFilter } from './dto/product-filter.dto';
import { ProductQuery } from './interfaces/product-query.interface';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
  ) {
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const productCreated = new this.productModel(createProductDto);

    const brand = await this.brandService.getBrandBySlugOrId(createProductDto.brandId);
    productCreated.brand = brand;

    return productCreated.save();
  }

  async deleteAll(): Promise<any> {
    return this.productModel.deleteMany({});
  }

  async getProductsByFilter(filter: ProductFilter): Promise<Product[]> {
    const { category, minPrice, maxPrice, currentPage, perPage } = filter;

    const query: ProductQuery = {};

    if (category) {
      try {
        const { id } = await this.categoryService.getCategoryBySlugOrId(category);
        query.categoryId = id;
      } catch (e) {
        query['brand.slug'] = {
          $regex: new RegExp(category, 'i'),
        };
      }
    }

    if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    }

    if (maxPrice !== undefined) {
      query.price = { ...query.price, $lte: maxPrice };
    }

    const products = await this.productModel
      .find(query)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .exec();

    return products;
  }
}
