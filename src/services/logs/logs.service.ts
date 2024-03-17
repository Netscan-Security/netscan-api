import { Inject, Injectable, Logger } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { eq } from 'drizzle-orm';
import {
  CreateLogDto,
  UpdateLogDto,
} from 'src/interfaces/dtos/logs.interface.dto';

@Injectable()
export class LogsService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  private readonly logger = new Logger(LogsService.name);

  async create(data: CreateLogDto): Promise<any> {
    const result = await this.db
      .insert(schema.logs)
      .values(data)
      .returning()
      .execute();

    return result[0];
  }

  // get log by id
  async findById(id: string) {
    return this.db.query.logs.findFirst({
      where: eq(schema.logs.id, id),
    });
  }

  async update(id: string, updateLogDto: UpdateLogDto): Promise<any> {
    const result = await this.db
      .update(schema.logs)
      .set(updateLogDto)
      .where(eq(schema.logs.id, id))
      .returning()
      .execute();

    this.logger.debug('Updated Log: ', result);
    return result[0];
  }

  async remove(id: string): Promise<any> {
    const result = await this.db
      .delete(schema.logs)
      .where(eq(schema.logs.id, id))
      .returning()
      .execute();

    this.logger.debug('Deleted Log: ', result);
    return result[0];
  }

  async findAll() {
    return this.db.query.logs.findMany({});
  }
}
