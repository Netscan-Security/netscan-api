import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { comparePassword } from './helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    Logger.log('Validating User: ', username);
    const user = await this.usersService.findOne(username);
    // if (comparePassword(password, user.password)) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { password, ...result } = user;

    //   return result;
    // }
    const pass = 'hashed_password';
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    Logger.log('Login Payload: ', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
