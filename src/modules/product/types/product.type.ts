import { Product } from '../schemas/product.schema';
import { ProductMeta } from '../interfaces/product-meta.interface';

export type ProductsWithMeta = {
  products: Product[];
  meta: ProductMeta;
};
