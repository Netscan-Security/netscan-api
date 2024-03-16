import { Controller, Get, Post, Body, Logger, Param } from '@nestjs/common';
import { FindOneParams } from 'src/interfaces/dtos/general.interface.dto';
import { CreateScanDto } from 'src/interfaces/dtos/scan.interface.dto';
import { ScanService } from 'src/services/scan/scan.service';

@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post('register')
  registerScan(@Body() data: CreateScanDto) {
    Logger.log('Registering Scan', `${JSON.stringify(data)}`);
    return this.scanService.create(data);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<any> {
    Logger.log('Scan Controller', 'Finding Scan: ', params.id);
    return this.scanService.findById(params.id);
  }

  @Get()
  viewScan() {
    return this.scanService.findAll();
  }
}