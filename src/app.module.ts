import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import {
  AllExceptionsFilter,
  ValidationExceptionFilter,
  BadRequestExceptionFilter,
  UnauthorizedExceptionFilter,
  ForbiddenExceptionFilter,
  NotFoundExceptionFilter,
} from './core/filters';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { NestDrizzleModule } from './modules/drizzle/drizzle.module';
import { TestController } from './controllers/test/test.controller';
import { LogsController } from './controllers/logs/logs.controller';
import { AntVirusController } from './controllers/ant-virus/ant-virus.controller';
import { ScannerController } from './controllers/scanner/scanner.controller';
import { VulnerabilityController } from './controllers/vulnerability/vulnerability.controller';
import { VulnerabilityService } from './services/vulnerability/vulnerability.service';
import { LogsService } from './services/logs/logs.service';
import { ScannerService } from './services/scanner/scanner.service';
import { HostController } from './controllers/host/host.controller';
import { HostService } from './services/host/host.service';
import { AntVirusService } from './services/ant-virus/ant-virus.service';
import * as schema from './modules/drizzle/schema';
import config from 'src/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    NestDrizzleModule.forRootAsync({
      useFactory: () => {
        return {
          driver: 'postgres-js',
          url: config.databaseURL,
          options: { schema },
          migrationOptions: { migrationsFolder: './migration' },
        };
      },
    }),
  ],
  controllers: [AppController, TestController, LogsController, AntVirusController, ScannerController, VulnerabilityController, HostController],
  providers: [
    AppService,

    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    { provide: APP_FILTER, useClass: BadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: UnauthorizedExceptionFilter },
    { provide: APP_FILTER, useClass: ForbiddenExceptionFilter },
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        }),
    },
    VulnerabilityService,
    LogsService,
    ScannerService,
    HostService,
    AntVirusService,
  ],
})
export class AppModule {}
