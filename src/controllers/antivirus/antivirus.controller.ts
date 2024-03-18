import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  CreateAntiVirusDto,
  UpdateAntiVirusDto,
} from 'src/interfaces/dtos/antivirus.interface.dto';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import { AntiVirusService } from 'src/services/antivirus/antivirus.service';

@Controller('antivirus')
export class AntivirusController {
  constructor(private readonly antVirusService: AntiVirusService) {}
  private readonly logger = new Logger(AntivirusController.name);

  @Post('register')
  registerAntivirus(@Body() data: CreateAntiVirusDto) {
    this.logger.debug('Registering Antivirus', `${JSON.stringify(data)}`);
    return this.antVirusService.create(data);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    this.logger.debug('Antivirus Controller', 'Finding Antivirus: ', params.id);
    return this.antVirusService.findById(params.id);
  }

  @Get()
  viewAntivirus() {
    return this.antVirusService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAntiVirusDto: UpdateAntiVirusDto,
  ) {
    Logger.log('Antivirus Controller', 'Updating Antivirus: ', id);
    return this.antVirusService.update(id, updateAntiVirusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    Logger.log('Antivirus Controller', 'Deleting Antivirus: ', id);
    return this.antVirusService.remove(id);
  }

  @Get('lastscan/:id')
  getLastVirusScan(@Param('id') id: string): { lastscan: string, status: string } {
    const currentDateTime = new Date().toISOString();
    console.log(id)
    return { lastscan: currentDateTime, status: 'not secure' };
  }

}
