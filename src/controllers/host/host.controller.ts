import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { cleanPassword } from 'src/common/utils/clean';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import {
  CreateHostDto,
  UpdateHostDto,
} from 'src/interfaces/dtos/hosts.interface.dto';
import { UsersService } from 'src/modules/users/users.service';
import { HostService } from 'src/services/host/host.service';

@Controller('host')
export class HostController {
  constructor(
    private readonly hostService: HostService,
    private readonly usersService: UsersService,
  ) {}
  private readonly logger = new Logger(HostController.name);

  @Post('register')
  async registerHost(@Body() data: CreateHostDto) {
    this.logger.debug(`${JSON.stringify(data)}`);

    // check if user has hasHost true
    const userHostCheck = await this.usersService.findById(data.userId);
    if (userHostCheck.hasHost) {
      throw new Error('User already has a host');
    }

    const host = await this.hostService.create(data);

    this.logger.debug('registered Host data: ', host);

    let user = await this.usersService.assignUserToHost(
      data.userId,
      data.roomId,
      true,
    );
    user = cleanPassword(user);

    this.logger.debug('assignUserToHost data: ', user);
    return { host, user };
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    this.logger.debug('Finding Host: ', params.id);
    return this.hostService.findById(params.id);
  }

  @Get('admin/:adminId')
  getHostByAdminId(@Param('adminId') adminId: string) {
    this.logger.debug('Getting Host by Admin ID: ', adminId);
    return this.hostService.findByAdminId(adminId);
  }

  @Get('user/:userId')
  getHostByUserId(@Param('userId') userId: string) {
    this.logger.debug('Getting Host by User ID: ', userId);
    return this.hostService.findByUserId(userId);
  }

  @Post(':id/perform-scan')
  performScan(@Param('id') id: string) {
    this.logger.debug('Performing Scan for Host ID: ', id);
    return this.hostService.performScan(id);
  }

  @Get()
  viewHost() {
    return this.hostService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHostDto: UpdateHostDto) {
    this.logger.debug('Updating Host: ', id);
    return this.hostService.update(id, updateHostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.debug('Deleting Host: ', id);
    return this.hostService.remove(id);
  }
}
