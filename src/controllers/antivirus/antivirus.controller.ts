import { Controller, Get, Post, Body, Logger, Param } from '@nestjs/common';
import { CreateAntiVirusDto } from 'src/interfaces/dtos/antivirus.interface.dto';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import { AntiVirusService } from 'src/services/antivirus/antivirus.service';

@Controller('ant-virus')
export class AntVirusController {
  constructor(private readonly antVirusService: AntiVirusService) {}

  @Post('register')
  registerAntVirus(@Body() data: CreateAntiVirusDto) {
    Logger.log('Registering AntVirus', `${JSON.stringify(data)}`);
    return this.antVirusService.create(data);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    Logger.log('AntVirus Controller', 'Finding AntVirus: ', params.id);
    return this.antVirusService.findById(params.id);
  }

  @Get()
  viewAntVirus() {
    return this.antVirusService.findAll();
  }
}
