import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CloudinaryConfig } from '../../config/cloudinary.config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    CloudinaryModule.registerAsync({
      useFactory: (cloudinaryConfig: ConfigType<typeof CloudinaryConfig>) => ({
        cloud_name: cloudinaryConfig.cloudName,
        api_key: cloudinaryConfig.apiKey,
        api_secret: cloudinaryConfig.apiSecret,
      }),
      inject: [CloudinaryConfig.KEY],
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
