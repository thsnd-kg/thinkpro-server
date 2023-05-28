export interface ProductQuery {
  price?: {
    $gte?: number;
    $lte?: number;
  };
  categoryId?: number;
  'brand.slug'?: any;
}
