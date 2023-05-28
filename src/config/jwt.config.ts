import { registerAs } from '@nestjs/config';

export const JwtConfig = registerAs('jwt', () => ({
  secretKey: process.env.JWT_SECRET_KEY || 'secret',
  accessTokenLifeTime: process.env.JWT_ACCESS_TOKEN_LIFE_TIME || '1h',
  refreshTokenLifeTime: process.env.JWT_REFRESH_TOKEN_LIFE_TIME || '1d',
}));
