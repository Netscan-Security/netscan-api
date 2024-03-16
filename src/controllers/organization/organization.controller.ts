import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateOrganizationDto } from 'src/interfaces/dtos/organization.interface.dto';
import { UsersService } from 'src/modules/users/users.service';
import { OrganizationService } from 'src/services/organization/organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationsService: OrganizationService,
    private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(OrganizationController.name);

  // create organization
  @Post('create')
  createOrganization(@Body() data: CreateOrganizationDto) {
    Logger.log('Creating organization', `${JSON.stringify(data)}`);
    // check if userid is admin

    const isUserAdmin = this.usersService.checkIfUserIsAdmin(data.ownedBy);
    if (!isUserAdmin) {
      throw new Error('User is not an admin');
    }
    return this.organizationsService.onBoardOrganization(data);
  }
}
