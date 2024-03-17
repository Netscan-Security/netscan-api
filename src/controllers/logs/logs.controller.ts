import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import { CreateLogDto } from 'src/interfaces/dtos/logs.interface.dto';
import { LogsService } from 'src/services/logs/logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}
  private readonly logger = new Logger(LogsController.name);

  @Get()
  viewLogs() {
    this.logger.debug('Viewing Logs');
    return this.logsService.findAll();
  }

  // get log by id
  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    this.logger.debug('Finding Log: ', params.id);
    return this.logsService.findById(params.id);
  }

  @Post('application/receive')
  postApplicationLogs(@Body() appLogs: CreateLogDto) {
    this.logger.debug(
      'Registering Application Log',
      `${JSON.stringify(appLogs)}`,
    );
    return this.logsService.create(appLogs);
  }

  // @Post('security/receive')
  // postSecurityLogs(@Body() secLogs: LogDto) {
  //   console.log(secLogs); // this is json blob of logs
  //   this.logsService.create(secLogs);
  //   return 'Thanks for the logs!';
  // }
  // @msec i removed the security logs endpoint because we can just use the same endpoint for all logs types
}
