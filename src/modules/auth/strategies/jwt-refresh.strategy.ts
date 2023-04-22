import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JWT_REFRESH_TOKEN_COOKIE_KEY } from 'src/common/constants';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { configAuth } from '../../../config/constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request): string => {
        return request?.cookies?.[JWT_REFRESH_TOKEN_COOKIE_KEY];
      }]),
      secretOrKey: configService.get(configAuth).secretKey,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload): any {
    return {
      username: payload.sub,
      email: payload.email,
    };
  }
}
