import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { HostDto } from 'src/interfaces/dtos/hosts.interface.dto';
import { HostService } from 'src/services/host/host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('register')
  registerHost(@Body() data: HostDto) {
    Logger.log('Registering Host', JSON.stringify(data));
    return this.hostService.create(data);
  }

  @Get()
  viewHost() {
    return this.hostService.findAll();
  }
}
