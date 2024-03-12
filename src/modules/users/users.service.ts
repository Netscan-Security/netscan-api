import { Inject, Injectable, Logger } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';

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
    Logger.log('Your found', data);
    return data;
  }
}
