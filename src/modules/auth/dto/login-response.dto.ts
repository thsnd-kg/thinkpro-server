import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken?: string;

  @ApiResponseProperty()
  username?: string;

  @ApiResponseProperty()
  email?: string;
}
