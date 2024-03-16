import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateOrganizationDto } from 'src/interfaces/dtos/organization.interface.dto';

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

  async onBoardOrganization(organization: CreateOrganizationDto) {
    return await this.db.transaction(async (tx) => {
      // Create organization
      const [newOrganization] = await tx
        .insert(schema.organizations)
        .values({
          name: organization.name,
          imageUrl: organization.imageUrl,
          description: organization.description,
          ownedBy: organization.ownedBy,
        })
        .returning()
        .execute();

      // Create campus
      const [newCampus] = await tx
        .insert(schema.campuses)
        .values({
          name: 'Campus 1',
          metadata: {},
          organizationId: newOrganization.id,
        })
        .returning()
        .execute();

      // Create building
      const [newBuilding] = await tx
        .insert(schema.buildings)
        .values({
          name: 'Building 1',
          metadata: {},
          campusId: newCampus.id,
        })
        .returning()
        .execute();

      // Create room
      const [newRoom] = await tx
        .insert(schema.rooms)
        .values({
          name: 'Room 1',
          metadata: {},
          buildingId: newBuilding.id,
        })
        .returning()
        .execute();

      return {
        organizationId: newOrganization.id,
        campusId: newCampus.id,
        buildingId: newBuilding.id,
        roomId: newRoom.id,
      };
    });
  }
}
