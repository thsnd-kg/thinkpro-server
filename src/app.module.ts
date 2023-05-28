import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AllExceptionFilter } from './common/exceptions';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { mongooseConfig } from './config/mongoose.config';
import { CategoryModule } from './modules/category/category.module';
import configurations from './config';
import { SeedModule } from './modules/seeder/seed.module';
import { BrandModule } from './modules/brand/brand.module';
import { FileModule } from './modules/file/file.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ProductModule } from './modules/product/product.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `${process.cwd()}/.env.${process.env.NODE_ENV}` : '.env',
      isGlobal: true,
      load: configurations,
    }),
    MongooseModule.forRootAsync(mongooseConfig),
    UserModule,
    AuthModule,
    CategoryModule,
    SeedModule,
    BrandModule,
    FileModule,
    CloudinaryModule,
    ProductModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
