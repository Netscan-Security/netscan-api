import { Inject, Injectable, Logger } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from 'src/interfaces/dtos/users.interface.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll() {
    const data = await this.db.query.users.findMany({});
    Logger.log('/FindAll: ', data);
    return this.db.query.users.findMany({});
  }

  async findOne(username: string) {
    type SelectUser = typeof schema.users.$inferSelect;
    Logger.log('Finding User: ', username);
    const data: SelectUser = await this.db.query.users.findFirst({
      where: eq(schema.users.username, username),
    });
    Logger.log('Found User by username: ', data);
    return data;
  }

  async findByEmail(email: string) {
    type SelectUser = typeof schema.users.$inferSelect;
    Logger.log('Finding User: ', email);
    const data: SelectUser = await this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
    Logger.debug('Found by email: ', data);
    return data;
  }

  async create(data: CreateUserDto): Promise<any> {
    const result = await this.db
      .insert(schema.users)
      .values(data)
      .returning()
      .execute();
    Logger.debug('Created User: ', result);
    return result[0];
  }
}
