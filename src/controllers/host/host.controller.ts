import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { HostDto } from 'src/interfaces/dtos/hosts.interface.dto';
import { HostService } from 'src/services/host/host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('register')
  registerHost(@Body() data: any) {

    /*
      Ugghh Fred you are killing me with this data structure @Body() data: HostDto
      Had to create a new HostDto object to get the data structure to work
      Try to see if you can refactor the data structure to work with the HostDto object
      But my non genius solution works just fine
    */

    const hostDto: HostDto = {
      name: 'Host Name', // This this hostname or person's name? I'm assuming hostname
      userId: '252fb8de-7a7c-437f-83f8-1be876699efb', // had to hardcode this too
      roomId: '65769ff1-04e1-4df5-9a80-965be938383e', // and this because I don't know where to get the room id
      cpu: data.mergedData.processorInfo.Name,
      memory: `${data.mergedData.physicalMemoryGB}GB`, // Assuming memory is in GB
      gpu: data.mergedData.videoControllerInfo.Name,
      hardDisk: '1TB', // had to hardcode some stuff
      os: `${data.mergedData.computerInfo.OsName} ${data.mergedData.computerInfo.OsVersion}`,
      model: 'Dell', // Provide model information
      ipAddress: data.mergedData.ipAddressInfo[1].IPAddress,
    };
    
    console.log(hostDto);

    /*

      //This was a mess to work with

      const cpu = data["mergedData"]["processorInfo"]["Name"];
      const clock_speed = data["mergedData"]["processorInfo"]["MaxClockSpeed"];
      const cores = data["mergedData"]["processorInfo"]["NumberOfCores"];
      const video_controller = data["mergedData"]["videoControllerInfo"]["Name"];
      const ip_address = data["mergedData"]["ipAddressInfo"][1]["IPAddress"];
      const memory = data["mergedData"]["physicalMemoryGB"];
      const os_name = data["mergedData"]["computerInfo"]["OsName"];
      const os_version = data["mergedData"]["computerInfo"]["OsVersion"];

      //console.log(cpu, clock_speed, cores, video_controller, ip_address, memory, os_name, os_version);


    */


    return this.hostService.create(hostDto);
  }

  @Get()
  viewHost() {
    return this.hostService.findAll();
  }
}
