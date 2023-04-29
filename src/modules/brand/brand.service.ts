import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<BrandDocument>,
  ) {}

  async getBrands(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }

  async getBrandBySlugOrId(identifier: string): Promise<Brand> {
    const brand: BrandDocument = await this.brandModel
      .findOne({ $or: [{ slug: identifier }, { _id: identifier }] })
      .exec();

    if (!brand) {
      throw new Error('Brand not found');
    }

    return brand;
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandModel.create(createBrandDto);
  }

  async deleteAll(): Promise<void> {
    await this.brandModel.deleteMany({});
  }
}
