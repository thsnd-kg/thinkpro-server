import { registerAs } from '@nestjs/config';
import { configApp } from './constants';

export default registerAs(configApp, () => ({
  port: process.env.PORT,
}))