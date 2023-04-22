import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { configAuth } from '../../../config/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(configAuth).secretKey,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload): any {
    console.log('validate jwt');

    return {
      username: payload.sub,
      email: payload.email,
    };
  }
}
