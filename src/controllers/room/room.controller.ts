import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { RoomService } from '../../services/room/room.service';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import { CreateRoomDto } from 'src/interfaces/dtos/room.interface.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  private readonly logger = new Logger(RoomController.name);

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    this.logger.debug(`findOne: ${params.id}`);
    return this.roomService.findById(params.id);
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    this.logger.debug(`create: ${createRoomDto}`);
    return this.roomService.create(createRoomDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: CreateRoomDto) {
    this.logger.debug(`update: ${id}`);
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.debug(`remove: ${id}`);
    return this.roomService.remove(id);
  }
}
