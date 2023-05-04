import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const MongoConfig = registerAs('mongo', () => ({
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  database: process.env.MONGODB_DATABASE,
}));
