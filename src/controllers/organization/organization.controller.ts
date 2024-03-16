import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateOrganizationDto } from 'src/interfaces/dtos/organization.interface.dto';
import { OrganizationService } from 'src/services/organization/organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationsService: OrganizationService) {}
  private readonly logger = new Logger(OrganizationController.name);

  // create organization
  @Post('create')
  createOrganization(@Body() data: CreateOrganizationDto) {
    Logger.log('Creating organization', `${JSON.stringify(data)}`);
    return this.organizationsService.onBoardOrganization(data);
  }
}
