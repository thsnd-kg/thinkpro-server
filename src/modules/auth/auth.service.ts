import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigType } from '@nestjs/config';
import { JWT_REFRESH_TOKEN_COOKIE_KEY } from '../../common/constants';
import { UserService } from '../user/user.service';
import { LoginDto, LoginResponse, RegisterDto } from './dto';

import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtConfig } from '../../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JwtConfig>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateByUsernameAndPassword(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) return null;

    const isPasswordMatches = await bcrypt.compare(pass, user.password);
    if (isPasswordMatches) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(request: LoginDto): Promise<LoginResponse> {
    const { username, password } = request;
    const user = await this.validateByUsernameAndPassword(username, password);

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const accessToken = await this.signAccessToken(username, user.email);

    return {
      accessToken,
      username,
      email: user.email,
    };
  }

  async getCookieRefreshToken(username: string): Promise<string> {
    const token = await this.signRefreshToken(username);
    const expiredIn = this.jwtConfig.refreshTokenLifeTime;

    return `${JWT_REFRESH_TOKEN_COOKIE_KEY}=${token}; HttpOnly; Path=/; Max-Age=${expiredIn}`;
  }

  async signAccessToken(username: string, email?: string): Promise<string> {
    const payload: JwtPayload = {
      sub: username,
      email,
    };

    return await this.jwtService.signAsync(payload);
  }

  async signRefreshToken(username: string, email?: string): Promise<string> {
    const payload: JwtPayload = {
      sub: username,
      email,
    };
    const expiredIn = this.jwtConfig.accessTokenLifeTime;

    return await this.jwtService.signAsync(payload, { expiresIn: expiredIn });
  }

  async register(registerRequest: RegisterDto): Promise<LoginResponse> {
    const { username, password } = registerRequest;

    const exist = await this.userService.existByUsername(username);
    if (exist) throw new BadRequestException(`${username} is registered`);

    await this.userService.create({ username, password });

    const accessToken = await this.signAccessToken(username);

    return {
      accessToken,
      username,
    };
  }
}
