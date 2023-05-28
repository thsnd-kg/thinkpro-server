import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';
import { JwtConfig } from '../../config/jwt.config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (jwtConfig: ConfigType<typeof JwtConfig>) => ({
        secret: jwtConfig.secretKey,
        signOptions: { expiresIn: jwtConfig.accessTokenLifeTime },
      }),
      inject: [JwtConfig.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
