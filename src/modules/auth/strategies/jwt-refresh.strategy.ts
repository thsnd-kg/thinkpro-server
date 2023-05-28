import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JWT_REFRESH_TOKEN_COOKIE_KEY } from 'src/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { JwtConfig } from '../../../config/jwt.config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(
    @Inject(JwtConfig.KEY)
    private jwtConfig: ConfigType<typeof JwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string => {
          return request?.cookies?.[JWT_REFRESH_TOKEN_COOKIE_KEY];
        },
      ]),
      secretOrKey: jwtConfig.secretKey,
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
