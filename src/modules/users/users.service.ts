import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll() {
    const data = await this.db.query.users.findMany({});
    console.log('/FindAll: ', data);
    return this.db.query.users.findMany({});
  }

  async findOne(id: string) {
    const data = await this.db.query.users.findFirst({ with: { id } });
    console.log('/FindOne: ', data);
    console.log(data);
  }

  // async create(data: { email: string; password: string }) {
  //   return this.db.query.users.insert({ data });
  // }

  // async update(id: string, data: { email: string; password: string }) {
  //   return this.db.query.users.update({ where: { id }, data });
  // }

  // async remove(id: string) {
  //   return this.db.query.users.delete({ where: { id } });
  // }

  // async findUserByEmail(email: string) {
  //   return this.db.query.users.findOne({ where: { email } });
  // }
}
