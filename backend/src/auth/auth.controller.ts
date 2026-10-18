import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

function extractToken(authorization: string | undefined): string | undefined {
  if (!authorization) return undefined;
  const [type, token] = authorization.split(' ');
  return type === 'Bearer' ? token : authorization;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body('email') email: string) {
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      throw new BadRequestException('A valid email is required');
    }
    return this.auth.login(email);
  }

  @Get('session')
  session(@Headers('authorization') authorization?: string) {
    return this.auth.getSession(extractToken(authorization));
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Headers('authorization') authorization?: string) {
    return this.auth.logout(extractToken(authorization));
  }
}
