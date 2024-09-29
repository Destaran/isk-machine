import { Controller, Post } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';

@Controller('data-scraper')
export class DataScraperController {
  constructor(private readonly DataScraperService: DataScraperService) {}

  @Post('regions')
  async scrapeRegions() {
    await this.DataScraperService.scrapeRegions();
  }
}
