import { Test, TestingModule } from '@nestjs/testing';
import { CronjobController } from './cronjob.controller';

describe('CronjobController', () => {
  let controller: CronjobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronjobController],
    }).compile();

    controller = module.get<CronjobController>(CronjobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
