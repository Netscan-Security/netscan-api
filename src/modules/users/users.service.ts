import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_ORM) private conn: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.conn.query.users.findMany({});
  }

  // async findOne(id: string) {
  //   return this.conn.query.users.findOne({ where: { id } });
  // }

  // async create(data: { email: string; password: string }) {
  //   return this.conn.query.users.create({ data });
  // }

  // async update(id: string, data: { email: string; password: string }) {
  //   return this.conn.query.users.update({ where: { id }, data });
  // }

  // async remove(id: string) {
  //   return this.conn.query.users.delete({ where: { id } });
  // }

  // async findUserByEmail(email: string) {
  //   return this.conn.query.users.findOne({ where: { email } });
  // }
}
