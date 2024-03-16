import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateLogDto } from 'src/interfaces/dtos/logs.interface.dto';
import { LogsService } from 'src/services/logs/logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  viewLogs() {
    return this.logsService.findAll();
  }

  @Post('application/receive')
  postApplicationLogs(@Body() appLogs: CreateLogDto) {
    return this.logsService.create(appLogs);
  }

  // @Post('security/receive')
  // postSecurityLogs(@Body() secLogs: LogDto) {
  //   console.log(secLogs); // this is json blob of logs
  //   this.logsService.create(secLogs);
  //   return 'Thanks for the logs!';
  // }
}
