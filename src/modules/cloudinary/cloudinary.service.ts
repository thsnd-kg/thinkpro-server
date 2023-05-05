import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import toStream from 'buffer-to-stream';

type Cloud = typeof Cloudinary;

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: Cloud) {
  }

  async upload(file: Express.Multer.File): Promise<UploadApiResponse> {
    console.log(file);
    return new Promise((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      file.stream.pipe(stream);
    });
  }

  async streamUpload(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          console.log('error', error);
          return reject(error);
        }
        resolve(result);
      });

      toStream(file.buffer).pipe(stream);
    });
  }

  // async delete(public_id: string): Promise<void> {
  //   await cloudinary.uploader.destroy(public_id);
  // }
  //
  // async getUrl(public_id: string): Promise<string> {
  //   return cloudinary.url(public_id);
  // }
}
