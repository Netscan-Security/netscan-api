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
import { CampusService } from '../../services/campus/campus.service';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import { CreateCampusDto } from 'src/interfaces/dtos/campus.interface.dto';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}
  private readonly logger = new Logger(CampusController.name);

  @Get()
  findAll() {
    return this.campusService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    this.logger.debug(`findOne: ${params.id}`);
    return this.campusService.findById(params.id);
  }

  @Post()
  create(@Body() createCampusDto: CreateCampusDto) {
    this.logger.debug(`create: ${createCampusDto}`);
    return this.campusService.create(createCampusDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCampusDto: CreateCampusDto) {
    this.logger.debug(`update: ${id}`);
    return this.campusService.update(id, updateCampusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.debug(`remove: ${id}`);
    return this.campusService.remove(id);
  }
}
