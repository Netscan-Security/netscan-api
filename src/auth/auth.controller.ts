import { Body, Controller, Post } from '@nestjs/common';
import {
  LoginUserDto,
  CreateUserDto,
} from 'src/interfaces/dtos/users.interface.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }

  @Post('/signup')
  async signup(@Body() data: CreateUserDto) {
    return this.authService.signup(data);
  }

  // !TODO - Implement logout
  // !TODO - Implement refresh token
  // @UseGuards(JwtAuthGuard)
  // @Get('auth/logout')
  // async logout(@Request() req) {
  //   return req.user;
  // }
}
