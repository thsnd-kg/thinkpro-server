import { Category } from '../schemas/category.schema';
import { Brand } from '../../brand/schemas/brand.schema';

export class CategoryResponseDto extends Category {
  brands: Brand[];
}
