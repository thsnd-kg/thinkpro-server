import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File {
  @Prop()
  path: string;

  @Prop()
  mimeType: string;

  @Prop()
  filename: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
