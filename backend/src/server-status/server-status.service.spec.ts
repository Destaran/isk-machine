import { Test, TestingModule } from '@nestjs/testing';
import { ServerStatusService } from './server-status.service';

describe('ServerStatusService', () => {
  let service: ServerStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerStatusService],
    }).compile();

    service = module.get<ServerStatusService>(ServerStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
