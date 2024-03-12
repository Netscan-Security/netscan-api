import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { comparePassword, hashPassword } from './helpers';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { User, UserResponse } from 'src/interfaces/tables/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    Logger.debug('Validating User: ', username);
    const user = await this.usersService.findOne(username);
    if (comparePassword(password, user.password)) {
      delete user.password;

      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    Logger.debug('Login user: ', payload.username);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(data: any) {
    Logger.debug('Signing up user: ', data.username);
    // !TODO check if user exist with username and email maybe do this on a validation
    // hash password

    try {
      data.password = await hashPassword(data.password);
      const user: User = await this.usersService.create(data);
      if (!user) {
        return error('Error creating user');
      }
      delete user.password;
      const access_token = (await this.login(user)).access_token;
      const result: UserResponse = { user, access_token };
      return result;
    } catch (error) {
      Logger.error('Error signing up user', error);
      throw error('Error signing up user');
    }
  }
}
