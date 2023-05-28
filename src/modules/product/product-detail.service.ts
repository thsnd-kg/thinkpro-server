import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDetail, ProductDetailDocument } from './schemas/product-detail.schema';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectModel(ProductDetail.name)
    private readonly productDetailModel: Model<ProductDetailDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProductDetail(
    createProductDetailDto: CreateProductDetailDto,
  ): Promise<ProductDetail> {
    const createdProductDetail = new this.productDetailModel(createProductDetailDto);

    const product = await this.productModel.findOne({
      productId: createProductDetailDto.productId,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    createdProductDetail.model = product;
    return createdProductDetail.save();
  }

  async getProductDetailBySkuId(skuId: number): Promise<ProductDetail> {
    if (!skuId) {
      throw new BadRequestException('Slug is required');
    }
    const product = await this.productDetailModel.findOne({ 'model.skuId': skuId }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product.toObject();
  }
}
