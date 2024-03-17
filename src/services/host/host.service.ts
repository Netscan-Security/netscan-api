import { Inject, Injectable, Logger } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import {
  HostDto,
  UpdateHostDto,
} from 'src/interfaces/dtos/hosts.interface.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class HostService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  private readonly logger = new Logger(HostService.name);

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

  async findById(id: string) {
    return this.db.query.hosts.findFirst({
      where: eq(schema.hosts.id, id),
    });
  }
  async update(id: string, updateHostDto: UpdateHostDto): Promise<any> {
    const result = await this.db
      .update(schema.hosts)
      .set(updateHostDto)
      .where(eq(schema.hosts.id, id))
      .returning()
      .execute();

    this.logger.debug('Host Service', 'Updated Host: ', result);
    return result[0];
  }

  async remove(id: string): Promise<any> {
    const result = await this.db
      .delete(schema.hosts)
      .where(eq(schema.hosts.id, id))
      .returning()
      .execute();

    this.logger.debug('Host Service', 'Deleted Host: ', result);
    return result[0];
  }
}
