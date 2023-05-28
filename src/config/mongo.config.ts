import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const MongoConfig = registerAs('mongo', () => ({
  uri: process.env.MONGODB_URI,
}));
