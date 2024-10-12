import { Injectable } from '@nestjs/common';
import { DataScraperService } from 'src/data-scraper/data-scraper.service';
import { RegionService } from 'src/region/region.service';
import { SystemService } from 'src/system/system.service';
import { OrdersService } from 'src/orders/orders.service';
import { TypesService } from 'src/type/types.service';
import { MetadataService } from 'src/metadata/metadata.service';

@Injectable()
export class MarketService {
  constructor(
    private readonly ordersSerivce: OrdersService,
    private readonly regionService: RegionService,
    private readonly systemService: SystemService,
    private readonly typeService: TypesService,
    private readonly dataScraperService: DataScraperService,
    private readonly metadataService: MetadataService,
  ) {}

  async searchTypes(search: string) {
    return await this.typeService.searchByName(search);
  }

  async getOrdersByTypeId(typeId: number) {
    console.log(`Getting market orders for type ${typeId}`);

    const orders = await this.ordersSerivce.getByTypeId(typeId);

    const uniquieRegionIds = [
      ...new Set(orders.map((order) => order.region_id)),
    ];

    const uniqueRegions = uniquieRegionIds.map(async (regionId) => {
      return await this.regionService.getOneBy({ id: regionId });
    });

    const resolvedRegions = await Promise.all(uniqueRegions);

    const regions = resolvedRegions.reduce((acc, region) => {
      acc[region.id] = region.name;
      return acc;
    }, {});

    const uniqueSystemIds = [
      ...new Set(orders.map((order) => order.system_id)),
    ];

    const uniqueSystems = uniqueSystemIds.map(async (systemId) => {
      return await this.systemService.getOneBy({ id: systemId });
    });

    const resolvedSystems = await Promise.all(uniqueSystems);

    const systems = resolvedSystems.reduce((acc, system) => {
      const secStatus =
        system.security_status <= 0
          ? '0.0'
          : system.security_status < 0.1
            ? '0.1'
            : (Math.round(system.security_status * 10) / 10).toFixed(1);
      acc[system.id] = {
        name: system.name,
        security_status: secStatus,
      };
      return acc;
    }, {});

    const locationIds = [...new Set(orders.map((order) => order.location_id))];

    const stationIds = locationIds.filter(
      (locationId) => locationId.toString().length === 8,
    );

    const stationsWithNamesRequest =
      await this.dataScraperService.postNames(stationIds);

    const stations = stationsWithNamesRequest.reduce((acc, station) => {
      acc[station.id] = station.name;
      return acc;
    }, {});

    const type = await this.typeService.getById(typeId);

    // TODO: Implement structure scraping
    // const structureIds = locationIds.filter(
    //   (locationId) => locationId.toString().length === 13,
    // );

    const scrapeDate = await this.metadataService.getLastScrapeDate();

    return {
      orders,
      regions,
      systems,
      stations,
      type,
      scrapeDate,
    };
  }
}
