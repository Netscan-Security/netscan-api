import { Test, TestingModule } from '@nestjs/testing';
import { AntVirusService } from './ant-virus.service';

describe('AntVirusService', () => {
  let service: AntVirusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntVirusService],
    }).compile();

    service = module.get<AntVirusService>(AntVirusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
