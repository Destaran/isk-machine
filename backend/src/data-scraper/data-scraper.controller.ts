import { Controller, Delete, Post } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';

@Controller('data-scraper')
export class DataScraperController {
  constructor(private readonly DataScraperService: DataScraperService) {}

  @Post('regions')
  async scrapeRegions() {
    await this.DataScraperService.scrapeRegions();
  }

  @Delete('regions')
  async clearRegions() {
    await this.DataScraperService.clearRegions();
  }

  @Post('orders')
  async getAllRegionOrders() {
    await this.DataScraperService.getAllRegionOrders();
  }

  @Delete('orders')
  async clearOrders() {
    await this.DataScraperService.clearOrders();
  }
}
