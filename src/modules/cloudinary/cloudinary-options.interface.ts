import { Type } from '@nestjs/common';

export const CLOUDINARY_MODULE_OPTIONS = 'CLOUDINARY_MODULE_OPTIONS';

export interface CloudinaryModuleOptions {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export interface CloudinaryModuleAsyncOptions {
  imports?: any[];
  useClass?: Type<CloudinaryModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<CloudinaryModuleOptions> | CloudinaryModuleOptions;
  inject?: any[];
}

export interface CloudinaryModuleOptionsFactory {
  createCloudinaryOptions():
    | Promise<CloudinaryModuleOptions>
    | CloudinaryModuleOptions;
}