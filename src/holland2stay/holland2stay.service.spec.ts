import { Test, TestingModule } from '@nestjs/testing';
import { Holland2stayService } from './holland2stay.service';

describe('Holland2stayService', () => {
  let service: Holland2stayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Holland2stayService],
    }).compile();

    service = module.get<Holland2stayService>(Holland2stayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
