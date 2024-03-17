import { Test, TestingModule } from '@nestjs/testing';
import { AntivirusController } from './antivirus.controller';

describe('AntivirusController', () => {
  let controller: AntivirusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AntivirusController],
    }).compile();

    controller = module.get<AntivirusController>(AntivirusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
