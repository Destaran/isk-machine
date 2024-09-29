import { Test, TestingModule } from '@nestjs/testing';
import { DataScraperController } from './data-scraper.controller';

describe('DataScraperController', () => {
  let controller: DataScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataScraperController],
    }).compile();

    controller = module.get<DataScraperController>(DataScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
