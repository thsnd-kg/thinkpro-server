import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { v2 as cloudinary } from 'cloudinary';
import {
  CloudinaryModuleAsyncOptions,
  CloudinaryModuleOptions,
  CloudinaryModuleOptionsFactory,
} from './cloudinary-options.interface';
import { CLOUDINARY, CLOUDINARY_MODULE_OPTIONS } from './cloudinary.constant';

@Module({})
export class CloudinaryModule {
  static register(options: CloudinaryModuleOptions): DynamicModule {
    const providers = this.createProviders(options);
    return {
      providers,
      module: CloudinaryModule,
      exports: providers,
    };
  }

  static registerAsync(options: CloudinaryModuleAsyncOptions): DynamicModule {
    return {
      module: CloudinaryModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: CLOUDINARY,
          useFactory: (configOptions: CloudinaryModuleOptions) => {
            cloudinary.config(configOptions);
            return cloudinary;
          },
          inject: [CLOUDINARY_MODULE_OPTIONS],
        },
        CloudinaryService,
      ],
      exports: [CLOUDINARY_MODULE_OPTIONS, CLOUDINARY, CloudinaryService],
    };
  }

  private static createAsyncProviders(options: CloudinaryModuleAsyncOptions): Provider[] {
    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: CLOUDINARY_MODULE_OPTIONS,
          useClass: options.useClass,
        },
      ];
    }

    return [this.createAsyncOptionsProvider(options)];
  }

  private static createAsyncOptionsProvider(options: CloudinaryModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: CLOUDINARY_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    // useClass case
    return {
      provide: CLOUDINARY_MODULE_OPTIONS,
      async useFactory(
        optionsFactory: CloudinaryModuleOptionsFactory,
      ): Promise<CloudinaryModuleOptions> {
        return optionsFactory.createCloudinaryOptions();
      },
      inject: [options.useClass],
    };
  }

  private static createProviders(options: CloudinaryModuleOptions) {
    return [
      {
        provide: CLOUDINARY,
        useValue: options,
      },
      CloudinaryService,
    ];
  }
}
