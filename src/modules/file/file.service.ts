import { Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

type MulterFile = Express.Multer.File;
type Cloud = typeof Cloudinary;

@Injectable()
export class FileService {
  constructor(private cloudinaryService: CloudinaryService) {}

  uploadFile(file: MulterFile) {
    return this.cloudinaryService.streamUpload(file);
  }
}
