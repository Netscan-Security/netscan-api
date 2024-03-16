import { Controller, Get, Logger, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/modules/users/users.service';

@Controller('profile')
export class ProfileController {
  constructor(private userService: UsersService) {}
  // !NOTE - This is a protected route that requires a valid JWT token, it is passed to the header as a Bearer token
  // !NOTE - For now we can't test this on the browser with swagger, we need to use Postman or Hoppscotch
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization: Bearer',
    description: 'Bearer token for authentication',
  })
  getProfile(@Request() req) {
    Logger.log('Profile Controller', 'Getting Profile: ', req.user);
    return this.userService.findByUsername(req.user.username);
  }
}
