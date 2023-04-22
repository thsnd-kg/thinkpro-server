import { registerAs } from '@nestjs/config';
import { configDb } from './constants';

export default registerAs(configDb, () => ({
  uri: process.env.MONGODB_URL,
}));