import { Inject, Injectable, Logger } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE_ORM } from 'src/core/constants/db.constants';
import * as schema from '../../modules/drizzle/schema';
import { eq } from 'drizzle-orm';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from 'src/interfaces/dtos/organization.interface.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>,
  ) {}
  private readonly logger = new Logger(OrganizationService.name);

  async findAll() {
    return this.db.query.organizations.findMany();
  }

  // findUserOrganizations
  async findUserOrganizations(userId: string) {
    return this.db.query.organizations.findMany({
      where: eq(schema.organizations.ownedBy, userId),
    });
  }

  async checkIfRoomExistById(id: string) {
    const room = await this.db.query.rooms.findFirst({
      where: eq(schema.rooms.id, id),
    });

    if (!room) {
      return false;
    }

    return true;
  }

  async findById(id: string) {
    return this.db.query.organizations.findFirst({
      where: eq(schema.organizations.id, id),
    });
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<any> {
    this.logger.debug('Updating Organization: ', updateOrganizationDto);
    const result = await this.db
      .update(schema.organizations)
      .set(updateOrganizationDto)
      .where(eq(schema.organizations.id, id))
      .returning()
      .execute();

    Logger.debug('Updated Organization: ', result);
    return result[0];
  }

  async remove(id: string): Promise<any> {
    this.logger.debug('Deleting Organization: ', id);
    const result = await this.db
      .delete(schema.organizations)
      .where(eq(schema.organizations.id, id))
      .returning()
      .execute();

    Logger.debug('Deleted Organization: ', result);
    return result[0];
  }

  async onBoardOrganization(organization: CreateOrganizationDto) {
    this.logger.debug('Onboarding Organization: ', organization);
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

      this.logger.debug('Created Organization: ', newOrganization);

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

      this.logger.debug('Created Campus: ', newCampus);

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

      this.logger.debug('Created Building: ', newBuilding);

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

      this.logger.debug('Created Room: ', newRoom);

      this.logger.debug('Organization Onboarding Completed 🥳');

      return {
        organizationId: newOrganization.id,
        campusId: newCampus.id,
        buildingId: newBuilding.id,
        roomId: newRoom.id,
      };
    });
  }
}
