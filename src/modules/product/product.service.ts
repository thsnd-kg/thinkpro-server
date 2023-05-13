import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BrandService } from '../brand/brand.service';
import { Color, ColorDocument } from './schemas/color.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(Color.name)
    private readonly colorModel: Model<ColorDocument>,
    private readonly brandService: BrandService,
  ) {
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const productCreated = new this.productModel(createProductDto);

    const brand = await this.brandService.getBrandBySlugOrId(createProductDto.brandId);
    productCreated.brand = brand;

    const colors = await this.colorModel.create(createProductDto.colors);
    productCreated.colors = colors;

    return productCreated.save();
  }
}
