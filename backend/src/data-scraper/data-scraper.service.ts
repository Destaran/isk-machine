import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegionService } from 'src/region/region.service';
import { SystemService } from 'src/system/system.service';
import { OrdersService } from 'src/orders/orders.service';
import { TypesService } from 'src/type/types.service';
import { MetadataService } from 'src/metadata/metadata.service';
import { StationService } from 'src/station/station.service';
import { StructureService } from 'src/structure/structure.service';
import { ConstellationService } from 'src/constellation/constellation.service';
import { MarketHistoryService } from 'src/market-history/market-history.service';
import { Cron } from '@nestjs/schedule';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class DataScraperService {

  @Cron('0 0 * * *')
  handleDailyCron() {
    this.scrapeMarketHistoryByRegionId(10000002);
  }

  @Cron('0 0 * * * *')
  handleCron() {
    this.scrapeAllOrders();
  }

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
    private readonly regionService: RegionService,
    private readonly systemService: SystemService,
    private readonly ordersService: OrdersService,
    private readonly typeService: TypesService,
    private readonly metadataService: MetadataService,
    private readonly stationService: StationService,
    private readonly structureService: StructureService,
    private readonly constellationService: ConstellationService,
    private readonly marketHistoryService: MarketHistoryService,
  ) {}

  async postNames(ids: number[]) {
    const namesUrl =
      'https://esi.evetech.net/latest/universe/names/?datasource=tranquility';
    const response = await firstValueFrom(this.httpService.post(namesUrl, ids));
    if (response.status === 200) {
      console.log(`Scraped ${response.data.length} names.`);
    }
    return response.data;
  }

  async scrapeConstellations() {
    this.constellationService.scrape();
  }

  async scrapeRegions() {
    this.regionService.scrape();
  }

  async scrapeSystems() {
    this.systemService.scrape();
  }

  async scrapeAllOrders() {
    this.logger.log({message: 'Started scraping all orders', level: 'info', timestamp: new Date().toISOString()});
    await this.ordersService.scrape();
    await this.metadataService.updateScrapeDate();
    this.logger.log({message: `Finished scraping all orders`, level: 'info', timestamp: new Date().toISOString()});
  }

  async getOrdersTotal() {
    return this.ordersService.getTotal();
  }

  async scrapeAllTypes() {
    this.typeService.scrape();
  }

  async scrapeAllStations() {
    this.stationService.scrape();
  }

  async scrapeAllStructures() {
    this.structureService.scrape();
  }

  async scrapeMarketHistoryById(typeId: number, regionId: number) {
    this.marketHistoryService.scrape(typeId, regionId);
  }

  async scrapeMarketHistoryByRegionId(regionId: number) {
    this.logger.log({message: 'Started scraping market history by region', level: 'info', timestamp: new Date().toISOString()});
    this.marketHistoryService.scrapeByRegionId(regionId);
    this.logger.log({message: `Finished scraping market history by region`, level: 'info', timestamp: new Date().toISOString()});
  }
}
