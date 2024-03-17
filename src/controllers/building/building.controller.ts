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
import { BuildingService } from '../../services/building/building.service';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import { CreateBuildingDto } from 'src/interfaces/dtos/building.interface.dto';

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}
  private readonly logger = new Logger(BuildingController.name);

  @Get()
  findAll() {
    return this.buildingService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    this.logger.debug(`findOne: ${params.id}`);
    return this.buildingService.findById(params.id);
  }

  @Post()
  create(@Body() createBuildingDto: CreateBuildingDto) {
    this.logger.debug(`create: ${createBuildingDto}`);
    return this.buildingService.create(createBuildingDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: CreateBuildingDto,
  ) {
    this.logger.debug(`update: ${id}`);
    return this.buildingService.update(id, updateBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.debug(`remove: ${id}`);
    return this.buildingService.remove(id);
  }
}
