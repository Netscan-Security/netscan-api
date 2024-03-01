import { AppService } from './app.service';
export declare class IName {
    name: string;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(query: IName): string;
}
