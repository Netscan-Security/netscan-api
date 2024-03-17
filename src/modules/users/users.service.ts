import { Inject, Injectable, Logger } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import {
  AddUserDto,
  CreateAdminDto,
  UpdateUserDto,
} from 'src/interfaces/dtos/users.interface.dto';
import { cleanPassword } from 'src/common/utils/clean';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  private readonly logger = new Logger(UsersService.name);

  // !TODO - UserSelectType does not work as expected,  we need it to be inferred from the schema, but it brings any

  async findAll() {
    const data = await this.db.query.users.findMany({});
    this.logger.debug('/FindAll: ', data);
    return this.db.query.users.findMany({});
  }

  async findByUsername(username: string, returnPassword: boolean = false) {
    this.logger.debug('Finding User by username: ', username);
    const data = await this.db.query.users.findFirst({
      where: eq(schema.users.username, username),
    });
    this.logger.debug('Found User by username: ', { data });
    if (!returnPassword && data) {
      return cleanPassword(data);
    }
    return data;
  }

  async findByEmail(email: string, returnPassword: boolean = false) {
    this.logger.debug('Finding User by email: ', email);

    const data = await this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
    this.logger.debug('Found by email: ', data);
    if (!returnPassword && data) {
      return cleanPassword(data);
    }
    return data;
  }

  async checkIfUserIsAdmin(userId: string) {
    this.logger.debug('Checking if user is admin: ', userId);
    const data = await this.db.query.users.findFirst({
      where: eq(schema.users.id, userId),
    });
    this.logger.debug('Found by id: ', data);
    if (data && data.role === 'admin') {
      return true;
    }
    return false;
  }

  async findByContactNumber(
    contactNumber: string,
    returnPassword: boolean = false,
  ) {
    this.logger.debug('Finding User: ', contactNumber);
    const data = await this.db.query.users.findFirst({
      where: eq(schema.users.contactNumber, contactNumber),
    });
    this.logger.debug('Found by contact number: ', data);
    if (!returnPassword && data) {
      return cleanPassword(data);
    }
    return data;
  }

  async findById(id: string, returnPassword: boolean = false) {
    this.logger.debug('Finding User: ', id);
    const data = await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });
    this.logger.debug('Found by id: ', data);
    if (!returnPassword && data) {
      return cleanPassword(data);
    }
    return data;
  }

  // updateUserHasHost
  async updateUserHasHost(userId: string, hasHost: boolean) {
    this.logger.debug('Updating User hasHost: ', userId);
    const result = await this.db
      .update(schema.users)
      .set({ hasHost })
      .where(eq(schema.users.id, userId))
      .returning()
      .execute();

    this.logger.debug('Updated User hasHost: ', result);
    return result[0];
  }

  async create(data: CreateAdminDto | AddUserDto): Promise<any> {
    this.logger.debug('Creating User: ', data);
    const result = await this.db
      .insert(schema.users)
      .values(data)
      .returning()
      .execute();
    this.logger.debug('Created User: ', result);
    return result[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const result = await this.db
      .update(schema.users)
      .set(updateUserDto)
      .where(eq(schema.users.id, id))
      .returning()
      .execute();

    this.logger.debug('Updated User: ', result);
    return result[0];
  }

  async remove(id: string): Promise<any> {
    const result = await this.db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning()
      .execute();

    this.logger.debug('Deleted User: ', result);
    return result[0];
  }
}
