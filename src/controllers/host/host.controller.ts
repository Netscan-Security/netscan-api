import { Controller, Get, Post, Body } from '@nestjs/common';
import { HostService } from 'src/services/host/host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('register')
  registerHost(@Body() data: any) {
    console.log(data);

    return data;
  }

  @Get()
  viewHost() {
    return this.hostService.findAll();
  }
}
