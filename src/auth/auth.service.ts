import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { comparePassword, hashPassword } from './helpers';
import { JwtService } from '@nestjs/jwt';
import { User, UserResponse } from 'src/interfaces/tables/users.interface';
import {
  CreateAdminDto,
  AddUserDto,
} from 'src/interfaces/dtos/users.interface.dto';
import { cleanPassword } from 'src/common/utils/clean';
import { OrganizationService } from 'src/services/organization/organization.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private organizationService: OrganizationService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async login(user: any) {
    // check if email exist
    const userExist = await this.checkIfEmailExist(user.email);
    if (!userExist) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // validate the user
    const isValid = await this.validateUserWithEmail(user.email, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { username: user.username, sub: user.id };
    this.logger.debug('Login user: ', payload.username);
    const returnUser: User = await this.usersService.findByEmail(user.email);

    const access_token = (await this.signIn(returnUser)).access_token;
    user = cleanPassword(returnUser);

    const result: UserResponse = { user, access_token };
    return result;
  }

  async signIn(user: any) {
    const payload = { email: user.email, sub: user.id };
    this.logger.debug('Login user: ', payload.email);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createAdmin(data: CreateAdminDto) {
    data.role = 'admin';
    return this.signup(data);
  }

  async addUser(data: AddUserDto) {
    data.role = 'user';
    return this.signup(data);
  }

  async signup(data: CreateAdminDto | AddUserDto) {
    this.logger.debug('Signup data: ', data);
    // check if username exist
    const userExist = await this.checkIfUsernameExist(data.username);

    if (userExist) {
      throw new Error('Username already exist');
    }

    const emailExist = await this.usersService.findByEmail(data.email);
    if (emailExist) {
      throw new Error('Email already exist');
    }

    const contactNumberExist = await this.usersService.findByContactNumber(
      data.contactNumber,
    );
    if (contactNumberExist) {
      throw new Error('Contact number already exist');
    }

    // if there is data.createBy, check if the user exist
    if ((data as AddUserDto).createdBy ?? false) {
      const createdByExist = await this.checkIfUserExist(
        (data as AddUserDto).createdBy,
      );
      if (!createdByExist) {
        throw new Error('User who is creating this user does not exist');
      }
    }

    // if we have roomId, check if the room exist
    if ((data as AddUserDto).roomId ?? false) {
      const roomExist = await this.organizationService.checkIfRoomExistById(
        (data as AddUserDto).roomId,
      );
      // !TODO - check if the room is active & ig the admin has organization which has the room
      if (!roomExist) {
        throw new Error('Room does not exist');
      }
    }

    data.password = await hashPassword(data.password);
    let user: User = await this.usersService.create(data);
    if (!user) {
      throw new Error('Error creating user');
    }
    const access_token = (await this.signIn(user)).access_token;
    user = cleanPassword(user);

    const result: UserResponse = { user, access_token };
    return result;
  }

  async validateUserWithUsername(
    username: string,
    password: string,
  ): Promise<any> {
    this.logger.debug('Validating User: ', username);
    const user = await this.usersService.findByUsername(username, true);
    if (comparePassword(password, user.password)) {
      delete user.password;

      return user;
    }
    return null;
  }

  async validateUserWithEmail(email: string, password: string): Promise<any> {
    this.logger.debug('Validating User: ', email);
    const user = await this.usersService.findByEmail(email, true);
    if (comparePassword(password, user.password)) {
      delete user.password;

      return user;
    }
    return null;
  }

  async checkIfUsernameExist(username: string) {
    this.logger.debug('Checking if user exist: ', username);
    const user = await this.usersService.findByUsername(username);
    if (user && user !== null && user !== undefined) {
      return true;
    }
    return false;
  }

  async checkIfEmailExist(email: string) {
    this.logger.debug('Checking if email exist: ', email);
    const user = await this.usersService.findByEmail(email);
    if (user) {
      return true;
    }
    return false;
  }

  async checkIfContactNumberExist(contactNumber: string) {
    this.logger.debug('Checking if contact number exist: ', contactNumber);
    const user = await this.usersService.findByContactNumber(contactNumber);
    if (user) {
      return true;
    }
    return false;
  }

  async checkIfUserExist(id: string) {
    this.logger.debug('Checking if user exist: ', id);
    const user = await this.usersService.findById(id);
    if (user) {
      return true;
    }
    return false;
  }
}
