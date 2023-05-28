import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<BrandDocument>,
  ) {}

  async getBrands(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }

  async getBrandBySlugOrId(identifier: string | number): Promise<Brand> {
    if (!identifier) throw new BadRequestException('Identifier is required');

    const filter =
      typeof identifier === 'string'
        ? { $or: [{ slug: identifier }, { _id: identifier }] }
        : { id: identifier };

    const brand: BrandDocument = await this.brandModel.findOne(filter).exec();

    if (!brand) {
      throw new NotFoundException(`Brand with identifier ${identifier} not found`);
    }

    return brand.toObject();
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandModel.create(createBrandDto);
  }

  async deleteAll(): Promise<void> {
    await this.brandModel.deleteMany({});
  }

  async getDetailBrandBySlug(slug: string) {
    const parentBrand: BrandDocument = await this.brandModel
      .findOne({
        $or: [{ slug }, { sharedUrl: slug }],
      })
      .exec();

    const subBrands: BrandDocument[] = await this.brandModel
      .find({
        parentId: parentBrand.id,
      })
      .exec();

    return { ...parentBrand.toObject(), subBrands };
  }

  async getBrandsInCategory(slug: string): Promise<Brand[]> {
    const brands: BrandDocument[] = await this.brandModel
      .find({
        parentId: null,
        sharedUrl: {
          $regex: new RegExp(slug, 'i'),
        },
      })
      .exec();

    return brands.map((brand) => brand.toObject());
  }
}
