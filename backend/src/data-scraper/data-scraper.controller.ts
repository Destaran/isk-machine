import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Delete('systems')
  async wipeSystems() {
    await this.DataScraperService.wipeSystems();
  }

  @Delete('regions')
  async wipeRegions() {
    await this.DataScraperService.wipeRegions();
  }

  @Post('orders')
  async scrapeAllRegionsAllOrders() {
    await this.DataScraperService.scrapeAllRegionsAllOrders();
  }

  @Post('orders/continue/:regionId')
  async continueAllRegionsAllOrdersFrom(@Param('regionId') regionId: number) {
    await this.DataScraperService.continueAllRegionsAllOrders(regionId);
  }

  @Post('orders/continue')
  async continueAllRegionsAllOrders() {
    return await this.DataScraperService.continueAllRegionsAllOrders();
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
}
