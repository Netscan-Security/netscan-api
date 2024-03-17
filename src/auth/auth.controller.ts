import { Body, Controller, Post } from '@nestjs/common';
import {
  LoginUserDto,
  CreateAdminDto,
  AddUserDto,
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

  @Post('/signup-admin')
  async signup(@Body() data: CreateAdminDto) {
    data.role = 'admin';
    return this.authService.createAdmin(data);
  }

  @Post('/add-user')
  async addUser(@Body() data: AddUserDto) {
    return this.authService.addUser(data);
  }

  // !TODO - Implement logout
  // !TODO - Implement refresh token
  // @UseGuards(JwtAuthGuard)
  // @Get('auth/logout')
  // async logout(@Request() req) {
  //   return req.user;
  // }
}
