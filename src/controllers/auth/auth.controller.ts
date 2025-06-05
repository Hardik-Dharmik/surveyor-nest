import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { Public } from '../../config/public-strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: Record<string, any>) {
    const payload = {
      username: signUpDto.username,
      email: signUpDto.email,
      password: signUpDto.password,
    };
    return this.authService.signUp(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('check-availability')
  async checkAvailability(
    @Query('email') email?: string,
    @Query('username') username?: string,
  ) {
    return this.authService.checkAvailability(email, username);
  }
}
