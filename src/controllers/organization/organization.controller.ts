import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from 'src/interfaces/dtos/organization.interface.dto';
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
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    Logger.log('Organization Controller', 'Updating Organization: ', id);
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    Logger.log('Organization Controller', 'Finding Organization: ', id);
    return this.organizationsService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    Logger.log('Organization Controller', 'Deleting Organization: ', id);
    return this.organizationsService.remove(id);
  }

  @Get('ownedBy/:id')
  findUserOrganizations(@Param('id') id: string) {
    Logger.log('Organization Controller', 'Finding User Organizations: ', id);
    return this.organizationsService.findUserOrganizations(id);
  }

  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }
}
