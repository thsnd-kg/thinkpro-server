import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import * as path from 'path';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateColorDto } from '../dto/create-color.dto';
import { ProductService } from '../product.service';

@Injectable()
export class ProductSeeder {
  constructor(
    private readonly productService: ProductService,
  ) {
  }

  @Command({ command: 'seed:products', describe: 'create products' })
  async seed(): Promise<any> {
    console.log('Seeding products ...');

    const jsonString = fs.readFileSync(path.join(__dirname, 'product.json'), 'utf8');
    const jsonData = JSON.parse(jsonString);
    const products = jsonData.map((json) => {
      const product: CreateProductDto = {
        skuId: json.sku_id,
        productId: json.product_id,
        categoryId: json.category_id,
        sharedUrl: json.shared_url,
        slug: json.slug,
        image: json.image,
        name: json.name,
        brandId: json.brand_id,
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
      return this.productService.createProduct(product);
    });
    console.log('Seeding products successfully!!');

    return Promise.all(products);
  }

  @Command({ command: 'drop:products', describe: 'drop products' })
  async drop(): Promise<any> {
    console.log('Dropping products ...');
    await this.productService.deleteAll();
    console.log('Dropping products successfully!!');
  }
}