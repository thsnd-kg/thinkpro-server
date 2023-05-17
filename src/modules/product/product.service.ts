import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly brandService: BrandService,
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
}
