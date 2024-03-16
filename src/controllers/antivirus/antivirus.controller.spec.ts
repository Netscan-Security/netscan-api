import { Test, TestingModule } from '@nestjs/testing';
import { AntVirusController } from './antivirus.controller';

describe('AntVirusController', () => {
  let controller: AntVirusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AntVirusController],
    }).compile();

    controller = module.get<AntVirusController>(AntVirusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
