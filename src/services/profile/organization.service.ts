import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  async checkIfRoomExistById(id: string) {
    const room = await this.db.query.rooms.findFirst({
      where: eq(schema.rooms.id, id),
    });

    if (!room) {
      return false;
    }

    return true;
  }
}
