import { Test, TestingModule } from '@nestjs/testing';
import { KidsService } from './kids.service';

describe('KidsService', () => {
  let service: KidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KidsService],
    }).compile();

    service = module.get<KidsService>(KidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
