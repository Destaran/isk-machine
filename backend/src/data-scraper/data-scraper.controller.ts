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
  async clearRegions() {
    await this.DataScraperService.clearRegions();
  }

  @Post('orders')
  async getAllRegionsAllOrders() {
    await this.DataScraperService.getAllRegionsAllOrders();
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
  async getAllRegionOrders(@Param('regionId') regionId: number) {
    await this.DataScraperService.getAllRegionOrders(regionId);
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
