import { LogsService } from 'src/services/logs/logs.service';
export declare class LogsController {
    private logsService;
    constructor(logsService: LogsService);
    fakeLogs(): Promise<string>;
}
