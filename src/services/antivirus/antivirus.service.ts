import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateAntiVirusDto } from 'src/interfaces/dtos/antivirus.interface.dto';

@Injectable()
export class AntiVirusService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(data: CreateAntiVirusDto): Promise<any> {
    const result = await this.db
      .insert(schema.antivirus)
      .values(data)
      .returning()
      .execute();

    return result[0];
  }

  async findById(id: string) {
    return this.db.query.antivirus.findFirst({
      where: eq(schema.antivirus.id, id),
    });
  }

  async findAll() {
    return this.db.query.antivirus.findMany({});
  }
}
