import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsController } from './controllers/logs/logs.controller';
import { LogsService } from './services/logs/logs.service';
import { TestController } from './controllers/test/test.controller';

@Module({
  imports: [],
  controllers: [AppController, LogsController, TestController],
  providers: [AppService, LogsService],
})
export class AppModule {}
