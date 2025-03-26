import { Controller, Get, Post } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';

@Controller('data-scraper')
export class DataScraperController {
  constructor(private readonly DataScraperService: DataScraperService) {}

  @Post('regions')
  async scrapeRegions() {
    await this.DataScraperService.scrapeRegions();
  }

  @Post('systems')
  async scrapeSystems() {
    await this.DataScraperService.scrapeSystems();
  }

  @Post('orders')
  async scrapeAllRegionsAllOrders() {
    await this.DataScraperService.scrapeAllOrders();
  }

  @Get('orders/total')
  async getOrdersTotal() {
    return this.DataScraperService.getOrdersTotal();
  }

  @Post('types')
  async scrapeAllTypes() {
    await this.DataScraperService.scrapeAllTypes();
  }

  @Post('stations')
  async scrapeAllStations() {
    await this.DataScraperService.scrapeAllStations();
  }

  @Post('structures')
  async scrapeAllStructures() {
    await this.DataScraperService.scrapeAllStructures();
  }
}
