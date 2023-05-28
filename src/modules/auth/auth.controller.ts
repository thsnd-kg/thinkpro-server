import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginResponse, LoginDto } from './dto';
import { JwtRefreshGuard } from './guards';
import { CurrentUser, Public } from '../../common/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginRequest: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponse> {
    const auth = await this.authService.login(loginRequest);
    const cookie = await this.authService.getCookieRefreshToken(loginRequest.username);
    response.setHeader('Set-Cookie', cookie);
    return auth;
  }

  @Public()
  @Post('register')
  async register(@Body() registerRequest: RegisterDto): Promise<LoginResponse> {
    return this.authService.register(registerRequest);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('token')
  async getAccessToken(@CurrentUser('username') username: string): Promise<LoginResponse> {
    const accessToken = await this.authService.signAccessToken(username);
    return { accessToken };
  }
}
