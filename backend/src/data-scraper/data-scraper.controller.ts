import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';

@Controller('data-scraper')
export class DataScraperController {
  constructor(private readonly dataScraperService: DataScraperService) {}

  @Post('regions')
  async scrapeRegions() {
    await this.dataScraperService.scrapeRegions();
  }

  @Post('systems')
  async scrapeSystems() {
    await this.dataScraperService.scrapeSystems();
  }

  @Post('orders')
  async scrapeAllRegionsAllOrders() {
    await this.dataScraperService.scrapeAllOrders();
  }

  @Get('orders/total')
  async getOrdersTotal() {
    return this.dataScraperService.getOrdersTotal();
  }

  @Post('types')
  async scrapeAllTypes() {
    await this.dataScraperService.scrapeAllTypes();
  }

  @Post('stations')
  async scrapeAllStations() {
    await this.dataScraperService.scrapeAllStations();
  }

  @Post('structures')
  async scrapeAllStructures() {
    await this.dataScraperService.scrapeAllStructures();
  }

  @Post('constellations')
  async scrapeAllConstellations() {
    await this.dataScraperService.scrapeConstellations();
  }

  @Post('market-history')
  async scrapeMarketHistoryById(
    @Body('typeId') typeId: number,
    @Body('regionId') regionId: number,
  ) {
    await this.dataScraperService.scrapeMarketHistoryById(typeId, regionId);
  }
}
