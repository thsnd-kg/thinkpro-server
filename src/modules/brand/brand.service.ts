import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<BrandDocument>,
  ) {
  }

  async getBrands(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }

  async getBrandBySlugOrId(identifier: string | number): Promise<Brand> {
    if (!identifier) throw new BadRequestException('Identifier is required');

    const filter = typeof identifier === 'string'
      ? { $or: [{ slug: identifier }, { _id: identifier }] }
      : { id: identifier };

    const brand: BrandDocument = await this.brandModel
      .findOne(filter)
      .exec();

    if (!brand) {
      throw new NotFoundException(`Brand with identifier ${ identifier } not found`);
    }

    return brand.toObject();
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandModel.create(createBrandDto);
  }

  async deleteAll(): Promise<void> {
    await this.brandModel.deleteMany({});
  }
}
