import { Controller, Get, Post, Body, Logger, Param } from '@nestjs/common';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import { HostDto } from 'src/interfaces/dtos/hosts.interface.dto';
import { HostService } from 'src/services/host/host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('register')
  registerHost(@Body() data: HostDto) {
    Logger.log('Registering host', `${JSON.stringify(data)}`);
    return this.hostService.create(data);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    Logger.log('User Controller', 'Finding Host: ', params.id);
    return this.hostService.findById(params.id);
  }

  @Get()
  viewHost() {
    return this.hostService.findAll();
  }
}
