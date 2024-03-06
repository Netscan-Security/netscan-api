import { Controller, Get, Post, Body, Res, Header } from '@nestjs/common';

@Controller('host')
export class HostController {
    @Post('register')
    registerHost(@Body() data: any) {

        /*
            Waiting for Fred to implement the schema for database
            so new hosts can be added to the database
            and views later in the dashboard 
        */

        console.log(data);

        return data;
    }

    @Get('view/*')
    
    viewHost(@Res() res) {

        const host = {
            "processorInfo": {
                "Name": "Intel(R) Core(TM) i7-4770 CPU @ 3.40GHz",
                "Manufacturer": "GenuineIntel",
                "MaxClockSpeed": 3401,
                "NumberOfCores": 4
            },
            "videoControllerInfo": {
                "Name": "Intel(R) HD Graphics 4600",
                "AdapterRAM": 1073741824
            },
            "ipAddressInfo": [
                {
                    "IPAddress": "192.168.56.1",
                    "InterfaceAlias": "Ethernet 2"
                },
                {
                    "IPAddress": "192.168.100.132",
                    "InterfaceAlias": "Ethernet"
                },
                {
                    "IPAddress": "127.0.0.1",
                    "InterfaceAlias": "Loopback Pseudo-Interface 1"
                }
            ],
            "physicalMemoryGB": 16,
            "computerInfo": {
                "OsName": "Microsoft Windows 11 Pro",
                "OsVersion": "10.0.22621",
                "OsBuildNumber": "22621",
                "OsHardwareAbstractionLayer": "10.0.22621.2506",
                "WindowsVersion": "2009"
            }
        }

        //Set response header to application/json
        res.setHeader('Content-Type', 'application/json');
        return res.json(host);
        
    }

}
