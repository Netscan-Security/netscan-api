import { Controller, Get, Post, Body, Res } from '@nestjs/common';

@Controller('host')
export class HostController {
    @Post('register')
    registerHost(@Body() data: any) {

        console.log(data);

        return data;
    }

}
