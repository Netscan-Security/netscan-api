import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateCampusDto } from 'src/interfaces/dtos/campus.interface.dto';

@Injectable()
export class CampusService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(createCampusDto: CreateCampusDto): Promise<any> {
    const result = await this.db
      .insert(schema.campuses)
      .values(createCampusDto)
      .returning()
      .execute();

    return result[0];
  }

  // findAll
  async findAll(): Promise<any> {
    return this.db.query.campuses.findMany({});
  }

  async update(id: string, updateCampusDto: CreateCampusDto): Promise<any> {
    const result = await this.db
      .update(schema.campuses)
      .set(updateCampusDto)
      .where(eq(schema.campuses.id, id))
      .returning()
      .execute();

    return result[0];
  }

  async remove(id: string): Promise<any> {
    const result = await this.db
      .delete(schema.campuses)
      .where(eq(schema.campuses.id, id))
      .returning()
      .execute();

    return result[0];
  }

  async checkById(id: string): Promise<any> {
    return this.db.query.campuses.findFirst({
      where: eq(schema.campuses.id, id),
    });
  }
}
