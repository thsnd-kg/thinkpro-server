import { registerAs } from '@nestjs/config';

export const MongoConfig = registerAs('mongo', () => ({
  uri: process.env.MONGODB_URL,
}));