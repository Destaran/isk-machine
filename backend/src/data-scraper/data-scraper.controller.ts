import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';

@Controller('data-scraper')
export class DataScraperController {
  constructor(private readonly DataScraperService: DataScraperService) {}

  @Post('regions')
  async scrapeRegions() {
    await this.DataScraperService.scrapeRegions();
  }

  @Delete('regions')
  async wipeRegions() {
    await this.DataScraperService.wipeRegions();
  }

  @Post('systems')
  async scrapeSystems() {
    await this.DataScraperService.scrapeSystems();
  }

  @Delete('systems')
  async wipeSystems() {
    await this.DataScraperService.wipeSystems();
  }

  @Post('orders')
  async scrapeAllRegionsAllOrders() {
    await this.DataScraperService.scrapeAllRegionsAllOrders();
  }

  @Post('orders/:regionId')
  async scrapeAllRegionOrders(@Param('regionId') regionId: number) {
    await this.DataScraperService.scrapeAllRegionOrders(regionId);
  }

  @Get('orders/total')
  async getOrdersTotal() {
    return this.DataScraperService.getOrdersTotal();
  }

  @Delete('orders')
  async wipeAllOrders() {
    await this.DataScraperService.wipeAllOrders();
  }

  @Delete('orders/:regionId')
  async wipeRegionOrders(@Param('regionId') regionId: number) {
    await this.DataScraperService.wipeRegionOrders(regionId);
  }

  @Post('types')
  async scrapeAllTypes() {
    await this.DataScraperService.scrapeAllTypes();
  }

  @Post('stations')
  async scrapeAllStations() {
    await this.DataScraperService.scrapeAllStations();
  }
}
