import { Module } from '@nestjs/common';
import { HostController } from 'src/controllers/host/host.controller';
import { HostService } from 'src/services/host/host.service';
import { UsersService } from '../users/users.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [HostController],
  providers: [HostService, UsersService],
  exports: [HostService],
})
export class HostModule {}
