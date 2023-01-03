import { Test, TestingModule } from '@nestjs/testing';
import { Holland2stayController } from './holland2stay.controller';

describe('Holland2stayController', () => {
  let controller: Holland2stayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Holland2stayController],
    }).compile();

    controller = module.get<Holland2stayController>(Holland2stayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
