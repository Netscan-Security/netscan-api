import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrganizationService } from 'src/services/organization/organization.service';

@Module({
  controllers: [UsersController],
  imports: [],
  providers: [UsersService, OrganizationService],
  exports: [UsersService],
})
export class UsersModule {}
