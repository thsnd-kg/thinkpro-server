import { DynamicModule, FactoryProvider, Module, ModuleMetadata } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { v2 as cloudinary } from 'cloudinary';

export interface CloudinaryModuleOptions {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

type CloudinaryModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<typeof cloudinary>, 'useFactory' | 'inject'>;

@Module({})
export class CloudinaryModule {
  static register(options: CloudinaryModuleOptions): DynamicModule {
    return {
      module: CloudinaryModule,
      providers: [CloudinaryService, {
        provide: 'CLOUDINARY',
        useFactory: () => {
          cloudinary.config(options);
          return cloudinary;
        },
      }],
      exports: [CloudinaryService],
    };
  }

  // Maybe this is not the best way to do it, but it works
  static registerAsync(options: CloudinaryModuleAsyncOptions): DynamicModule {
    return {
      module: CloudinaryModule,
      imports: options.imports,
      providers: [CloudinaryService, {
        provide: 'CLOUDINARY',
        useFactory: options.useFactory,
        inject: options.inject,
      }],
      exports: [CloudinaryService],
    };
  }


}
