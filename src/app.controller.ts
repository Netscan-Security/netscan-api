import {
  Controller,
  Get,
  Post,
  Request,
  Query,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
// import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './modules/users/users.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import {
  CreateUserDto,
  LoginUserDto,
} from './interfaces/dtos/users.interface.dto';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization: Bearer',
    description: 'Bearer token for authentication',
  })
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.username);
  }
}
