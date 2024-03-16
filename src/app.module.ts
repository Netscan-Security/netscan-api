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
import { VulnerabilityController } from './controllers/vulnerability/vulnerability.controller';
import { VulnerabilityService } from './services/vulnerability/vulnerability.service';
import { LogsService } from './services/logs/logs.service';
import { HostController } from './controllers/host/host.controller';
import { HostService } from './services/host/host.service';
import { AuthModule } from './auth/auth.module';
import * as schema from './modules/drizzle/schema';
import config from 'src/config';
import { AntVirusController } from './controllers/antivirus/antivirus.controller';
import { ScanController } from './controllers/scan/scan.controller';
import { AntiVirusService } from './services/antivirus/antivirus.service';
import { ScanService } from './services/scan/scan.service';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';

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
          migrationOptions: {
            migrationsFolder: './src/modules/drizzle/migrations',
          },
        };
      },
    }),
    AuthModule,
  ],
  controllers: [
    AppController,
    TestController,
    LogsController,
    AntVirusController,
    ScanController,
    VulnerabilityController,
    HostController,
    ProfileController,
  ],
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
    ScanService,
    HostService,
    AntiVirusService,
    ProfileService,
  ],
})
export class AppModule {}
