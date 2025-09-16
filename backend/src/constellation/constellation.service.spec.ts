import { Test, TestingModule } from '@nestjs/testing';
import { ConstellationService } from './constellation.service';

describe('ConstellationService', () => {
  let service: ConstellationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstellationService],
    }).compile();

    service = module.get<ConstellationService>(ConstellationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
