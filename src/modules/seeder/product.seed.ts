import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import * as path from 'path';
import process from 'process';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { CreateColorDto } from '../product/dto/create-color.dto';
import { ProductService } from '../product/product.service';
import { BrandService } from '../brand/brand.service';
import { ProductDetailService } from '../product/product-detail.service';
import { CreateProductDetailDto } from '../product/dto/create-product-detail.dto';

@Injectable()
export class ProductSeeder {
  constructor(
    private readonly productService: ProductService,
    private readonly productDetailService: ProductDetailService,
    private readonly brandService: BrandService,
  ) {}

  @Command({ command: 'seed:products', describe: 'create products' })
  async seed(): Promise<any> {
    console.log('Seeding products ...');

    const jsonString = fs.readFileSync(path.join(process.cwd(), 'data/product.json'), 'utf8');
    const jsonData = JSON.parse(jsonString);
    const productPromises = jsonData.map(async (json) => {
      const product: CreateProductDto = {
        skuId: json.sku_id,
        productId: json.product_id,
        categoryId: json.category_id,
        sharedUrl: json.shared_url,
        slug: json.slug,
        image: json.image,
        name: json.name,
        brandId: json.brand.id,
        colors: json.colors.map((color) => {
          const colorDto: CreateColorDto = {
            name: color.name,
            code: color.code,
          };
          return colorDto;
        }),
        price: json.price,
        modelValues: json.model_value,
      };
      try {
        return await this.productService.createProduct(product);
      } catch (e) {
        console.log(e);
      }
    });

    await Promise.all(productPromises);
    console.log('Seeding products successfully!!');

    console.log('Seeding product details ...');

    const productDetailJson = fs.readFileSync(
      path.join(process.cwd(), 'data/product_details.json'),
      'utf8',
    );
    const productDetailData = JSON.parse(productDetailJson);
    const productDetailPromises = productDetailData.map(async (data) => {
      if (!data.SKU) return;
      const productDetail: CreateProductDetailDto = {
        SKU: data.SKU,
        assets: data.assets.map((asset) => {
          return {
            src: asset.src,
            type: asset.type,
          };
        }),
        variations: data.variations,
        attributes: data.attributes.map((attribute) => {
          return {
            ...attribute,
            groupName: attribute.group_name,
          };
        }),
        article: data.article,
        productId: data.product_id,
      };

      try {
        return await this.productDetailService.createProductDetail(productDetail);
      } catch (e) {
        console.log(e);
      }
    });

    await Promise.all(productDetailPromises);
    console.log('Seeding product details successfully!!');
  }

  @Command({ command: 'drop:products', describe: 'drop products' })
  async drop(): Promise<any> {
    console.log('Dropping products ...');
    await this.productService.deleteAll();
    console.log('Dropping products successfully!!');
  }
}
