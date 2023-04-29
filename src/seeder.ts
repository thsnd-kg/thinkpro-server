import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './modules/category/schemas/category.schema';
import { CategorySeeder } from './database/seeds/category.seed';

seeder({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ],
}).run([CategorySeeder]);