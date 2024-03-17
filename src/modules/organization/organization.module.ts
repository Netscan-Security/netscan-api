import { Module } from '@nestjs/common';
import { OrganizationController } from 'src/controllers/organization/organization.controller';
import { OrganizationService } from 'src/services/organization/organization.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [OrganizationController],
  imports: [],
  providers: [OrganizationService, UsersService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
