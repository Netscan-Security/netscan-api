import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsController } from './controllers/logs/logs.controller';
import { LogsService } from './services/logs/logs.service';

@Module({
  imports: [],
  controllers: [AppController, LogsController],
  providers: [AppService, LogsService],
})
export class AppModule {}
