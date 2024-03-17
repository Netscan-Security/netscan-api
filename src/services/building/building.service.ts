import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateBuildingDto } from 'src/interfaces/dtos/building.interface.dto';

@Injectable()
export class BuildingService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(createBuildingDto: CreateBuildingDto): Promise<any> {
    const result = await this.db
      .insert(schema.buildings)
      .values(createBuildingDto)
      .returning()
      .execute();

    return result[0];
  }

  async update(id: string, updateBuildingDto: CreateBuildingDto): Promise<any> {
    const result = await this.db
      .update(schema.buildings)
      .set(updateBuildingDto)
      .where(eq(schema.buildings.id, id))
      .returning()
      .execute();

    return result[0];
  }

  async remove(id: string): Promise<any> {
    const result = await this.db
      .delete(schema.buildings)
      .where(eq(schema.buildings.id, id))
      .returning()
      .execute();

    return result[0];
  }

  async findAll(): Promise<any> {
    return this.db.query.buildings.findMany({});
  }

  async findById(id: string): Promise<any> {
    return this.db.query.buildings.findFirst({
      where: eq(schema.buildings.id, id),
    });
  }
}
