import { Controller, Get } from '@nestjs/common';
import { LogsService } from 'src/services/logs/logs.service';

@Controller('logs')
export class LogsController {
    constructor(private logsService: LogsService) {}

    @Get('/*')
    async fakeLogs(): Promise<string>{
        return this.logsService.fakeLogs();
    }
    
}
