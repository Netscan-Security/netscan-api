import { Controller, Get, Post, Body } from '@nestjs/common';
import { LogsService } from 'src/services/logs/logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}
  @Get()
  viewLogs() {
    return this.logsService.findAll();
  }

  @Post('application/receive')
  postApplicationLogs(@Body() appLogs: any) {
    console.log(appLogs); // this is json blob of logs

    return 'Thanks for the logs!';
  }

  @Post('security/receive')
  postSecurityLogs(@Body() secLogs: any) {
    console.log(secLogs); // this is json blob of logs

    return 'Thanks for the logs!';
  }
}
