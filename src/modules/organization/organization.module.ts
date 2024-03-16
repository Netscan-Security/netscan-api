import { Module } from '@nestjs/common';
import { OrganizationController } from 'src/controllers/organization/organization.controller';
import { OrganizationService } from 'src/services/organization/organization.service';

@Module({
  controllers: [OrganizationController],
  imports: [],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}

// import { Module } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';

// @Module({
//   controllers: [UsersController],
//   imports: [],
//   providers: [UsersService],
//   exports: [UsersService],
// })
// export class UsersModule {}
