import { Injectable } from '@nestjs/common';

@Injectable()
export class PhoneService {
  Phone(): string {
    return 'Hello!';
  }
}
