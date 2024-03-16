import { Test, TestingModule } from '@nestjs/testing';
import { AntiVirusService } from './antivirus.service';
describe('AntiVirusService', () => {
  let service: AntiVirusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntiVirusService],
    }).compile();

    service = module.get<AntiVirusService>(AntiVirusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
