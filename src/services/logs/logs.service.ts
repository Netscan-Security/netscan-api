import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { CreateLogDto } from 'src/interfaces/dtos/CreateLogDto.interface.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class LogsService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(data: CreateLogDto): Promise<any> {
    const result = await this.db
      .insert(schema.logs)
      .values(data)
      .returning()
      .execute();

    return result[0];
  }

  async findAll() {
    return this.db.query.logs.findMany({});
  }
}
