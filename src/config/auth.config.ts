import { registerAs } from '@nestjs/config';
import { configAuth } from './constants';

export default registerAs(configAuth, () => ({
  secretKey: process.env.JWT_SECRET_KEY,
  accessTokenLifeTime: process.env.JWT_ACCESS_TOKEN_LIFE_TIME,
  refreshTokenLifeTime: process.env.JWT_REFRESH_TOKEN_LIFE_TIME,
}))