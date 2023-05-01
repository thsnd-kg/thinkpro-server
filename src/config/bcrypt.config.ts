import { registerAs } from '@nestjs/config';

export const BcryptConfig = registerAs('bcrypt', () => ({
  salt: process.env.BCRYPT_SALT || 10,
}));
