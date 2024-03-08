import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { HostDto } from 'src/interfaces/dtos/hosts.interface.dto';

@Injectable()
export class HostService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll() {
    return await this.db.query.hosts.findMany({});
  }

  async create(data: HostDto) {
    return await this.db
      .insert(schema.hosts)
      .values(data)
      .returning()
      .execute();
  }
}
