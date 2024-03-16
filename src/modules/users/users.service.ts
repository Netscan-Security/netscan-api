import { Inject, Injectable, Logger } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateUserDto } from 'src/interfaces/dtos/users.interface.dto';
import { cleanPassword } from 'src/common/utils/clean';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  // !TODO - UserSelectType does not work as expected,  we need it to be inferred from the schema, but it brings any

  async findAll() {
    const data = await this.db.query.users.findMany({});
    Logger.log('User Service', '/FindAll: ', data);
    return this.db.query.users.findMany({});
  }

  async findByUsername(username: string, returnPassword: boolean = false) {
    Logger.log('User Service', 'Finding User by username: ', username);
    const data = await this.db.query.users.findFirst({
      where: eq(schema.users.username, username),
    });
    Logger.log('User Service', 'Found User by username: ', { data });
    if (!returnPassword && data) {
      return cleanPassword(data);
    }
    return data;
  }

  async findByEmail(email: string, returnPassword: boolean = false) {
    Logger.log('User Service', 'Finding User by email: ', email);

    const data = await this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
    Logger.debug('User Service', 'Found by email: ', data);
    if (!returnPassword && data) {
      return cleanPassword(data);
    }
    return data;
  }

  async findByContactNumber(
    contactNumber: string,
    returnPassword: boolean = false,
  ) {
    Logger.debug('User Service', 'Finding User: ', contactNumber);
    const data = await this.db.query.users.findFirst({
      where: eq(schema.users.contactNumber, contactNumber),
    });
    Logger.debug('User Service', 'Found by contact number: ', data);
    if (!returnPassword && data) {
      return cleanPassword(data);
    }
    return data;
  }

  async findById(id: string, returnPassword: boolean = false) {
    Logger.log('User Service', 'Finding User: ', id);
    const data = await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });
    Logger.debug('User Service', 'Found by id: ', data);
    if (!returnPassword && data) {
      return cleanPassword(data);
    }
    return data;
  }

  async create(data: CreateUserDto): Promise<any> {
    const result = await this.db
      .insert(schema.users)
      .values(data)
      .returning()
      .execute();
    Logger.debug('User Service', 'Created User: ', result);
    return result[0];
  }
}
