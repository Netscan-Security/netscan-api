import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { comparePassword, hashPassword } from './helpers';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { User, UserResponse } from 'src/interfaces/tables/users.interface';
import { CreateUserDto } from 'src/interfaces/dtos/users.interface.dto';

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

  async checkIfUserExist(username: string) {
    Logger.debug('Checking if user exist: ', username);
    const user = await this.usersService.findOne(username);
    if (user) {
      return true;
    }
    return false;
  }

  async checkIfEmailExist(email: string) {
    Logger.debug('Checking if email exist: ', email);
    const user = await this.usersService.findByEmail(email);
    if (user) {
      return true;
    }
    return false;
  }

  async login(user: any) {
    // check if username exist
    const userExist = await this.checkIfUserExist(user.username);
    if (!userExist) {
      return {
        message: 'Invalid username or password',
      };
    }

    // validate the user
    const isValid = await this.validateUser(user.username, user.password);

    if (!isValid) {
      return {
        message: 'Password is incorrect',
      };
    }

    const payload = { username: user.username, sub: user.id };
    Logger.debug('Login user: ', payload.username);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(user: any) {
    const payload = { username: user.username, sub: user.id };
    Logger.debug('Login user: ', payload.username);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(data: CreateUserDto) {
    Logger.debug('Signing up user: ', data.username);
    // check if username exist
    const userExist = await this.checkIfUserExist(data.username);
    if (userExist) {
      return {
        message: 'Username already exist',
      };
    }

    const emailExist = await this.usersService.findByEmail(data.email);
    if (emailExist) {
      return {
        message: 'Email already exist',
      };
    }

    try {
      data.password = await hashPassword(data.password);
      const user: User = await this.usersService.create(data);
      if (!user) {
        return error('Error creating user');
      }
      const access_token = (await this.signIn(user)).access_token;
      delete user.password;
      const result: UserResponse = { user, access_token };
      return result;
    } catch (error) {
      Logger.error('Error signing up user', error);
      throw error('Error signing up user');
    }
  }
}
