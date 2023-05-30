import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { BrandService } from '../brand/brand.service';
import { ProductFilter } from './dto/product-filter.dto';
import { ProductQuery } from './interfaces/product-query.interface';
import { CategoryService } from '../category/category.service';
import { ProductsWithMeta } from './types/product.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const productCreated = new this.productModel(createProductDto);

    const brand = await this.brandService.getBrandBySlugOrId(createProductDto.brandId);
    productCreated.brand = brand;

    return productCreated.save();
  }

  async deleteAll(): Promise<any> {
    return this.productModel.deleteMany({});
  }

  async getProductsByFilter(filter: ProductFilter): Promise<ProductsWithMeta> {
    const { brands, category, minPrice, maxPrice, currentPage, perPage } = filter;
    const query: ProductQuery = {};

    if (category) {
      const { id } = await this.categoryService.getCategoryBySlugOrId(category);
      query.categoryId = id;
    }

    if (brands && brands.length > 0) {
      const regexs = brands.map((brand) => new RegExp(brand, 'i'));
      query['brand.slug'] = {
        $in: regexs,
      };
    }

    if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    }

    if (maxPrice !== undefined) {
      query.price = { ...query.price, $lte: maxPrice };
    }

    const products: Product[] = await this.productModel
      .find(query)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .exec();

    const totalItems = await this.productModel.countDocuments(query);
    const meta = {
      total: totalItems,
      currentPage,
      perPage,
      lastPage: Math.ceil(totalItems / perPage),
    };

    return {
      products,
      meta,
    };
  }
}
