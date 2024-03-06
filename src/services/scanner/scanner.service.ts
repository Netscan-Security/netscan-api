import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';

@Injectable()
export class ScannerService {
  constructor(
    @Inject(DRIZZLE_ORM) private conn: PostgresJsDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.conn.query.scanTypes.findMany({});
  }
}
