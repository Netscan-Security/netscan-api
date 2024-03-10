import { Inject, Injectable, Logger } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
// import { User } from 'src/interfaces/tables/users.interface';

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
    // type SelectUser = typeof schema.users.$inferSelect;
    Logger.log('Finding User: ', username);
    // const data: SelectUser = await this.db.query.users.findFirst({
    //   with: {
    //     username: username,
    //   },
    // });
    const data = {
      id: '6cb5e2a3-2b2d-4eb9-b02b-ea3b458c0f04',
      firstName: 'John',
      lastName: 'Moen',
      username: 'johndoe',
      email: 'Breana_Cormier52@gmail.com',
      contactNumber: '360-974-1682',
      password: 'hashed_password',
      imageUrl:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/755.jpg',
      role: 'user',
      hasHost: false,
      createdAt: '2024-03-09T06:06:04.000Z',
      updatedAt: '2024-03-09T10:18:59.000Z',
    };
    Logger.log('/FindOne: ', data);
    Logger.log(data);
    return data;
  }
}
