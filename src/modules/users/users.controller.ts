import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import { UpdateUserDto } from 'src/interfaces/dtos/users.interface.dto';

@Controller('user')
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    Logger.log('User Controller', 'Updating User: ', id);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    Logger.log('User Controller', 'Deleting User: ', id);
    return this.usersService.remove(id);
  }
}
