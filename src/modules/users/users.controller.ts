import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    Logger.log('User Controller', 'Finding User: ', params.id);
    return this.usersService.findById(params.id);
  }
}
