import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
// import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './modules/users/users.service';
import {
  CreateUserDto,
  LoginUserDto,
} from './interfaces/dtos/users.interface.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private appService: AppService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }

  @Post('auth/signup')
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

  @Get()
  getHello(@Query() query): string {
    console.log(query);
    return this.appService.getHello();
  }

  // health
  @Get('health')
  getHealth(): string {
    return 'OK';
  }
}
