import { Controller, Get, Res, Body, Post } from '@nestjs/common';
import { PhoneService } from '../../services/phone/phone.service';
import { Phonedto } from '../../classes/phonedto/phonedto';
import { OpenaiService } from 'src/services/openai/openai.service';

const base_url = 'https://mutually-immune-mayfly.ngrok-free.app/phone';

@Controller('phone')
export class PhoneController {
  constructor(
    private readonly phoneService: PhoneService,
    private readonly OpenaiService: OpenaiService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return this.OpenaiService.getHello();
  }

  @Post()
  /*
        This route is reponsible for welcoming a user to engage into a conversation via voice.
        the base route is: /phone
        Note: this route utilizes gpt-3.5-turbo-0125 to get dynamic responses
    */
  async handleCall(
    @Body()
    Phonedto: {
      callerNumber: Phonedto;
      sessionId: Phonedto;
      isActive: Phonedto;
    },
    @Res() res,
  ) {
    /*

        These variables are Data transfer objects, they can be used fetch variables from POST requests.
        console.log(Phonedto.callerNumber)
        console.log(Phonedto.sessionId)
        console.log(Phonedto.isActive) 

        */

    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Say>${await this.OpenaiService.welcome()}</Say>
          <Redirect>${base_url}/assistant</Redirect>
        </Response>`;

    res.header('Content-Type', 'application/xml');
    res.send(xmlResponse);
  }
  @Post('/assistant')
  Assistant(
    @Body()
    Phonedto: {
      callerNumber: Phonedto;
      sessionId: Phonedto;
      isActive: Phonedto;
    },
    @Res() res,
  ) {
    console.log(Phonedto.callerNumber);
    console.log(Phonedto.sessionId);

    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Say>It was redirected to assistant</Say>
        </Response>`;

    res.header('Content-Type', 'application/xml');
    res.send(xmlResponse);
  }
}
