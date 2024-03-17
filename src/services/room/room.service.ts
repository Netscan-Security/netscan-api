import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateRoomDto } from 'src/interfaces/dtos/room.interface.dto';

@Injectable()
export class RoomService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<any> {
    const result = await this.db
      .insert(schema.rooms)
      .values(createRoomDto)
      .returning()
      .execute();

    return result[0];
  }

  async update(id: string, updateRoomDto: CreateRoomDto): Promise<any> {
    const result = await this.db
      .update(schema.rooms)
      .set(updateRoomDto)
      .where(eq(schema.rooms.id, id))
      .returning()
      .execute();

    return result[0];
  }

  async remove(id: string): Promise<any> {
    const result = await this.db
      .delete(schema.rooms)
      .where(eq(schema.rooms.id, id))
      .returning()
      .execute();

    return result[0];
  }

  async findAll(): Promise<any> {
    return this.db.query.rooms.findMany({});
  }

  async findById(id: string): Promise<any> {
    return this.db.query.rooms.findFirst({
      where: eq(schema.rooms.id, id),
    });
  }
}
