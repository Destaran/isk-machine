import { Injectable } from '@nestjs/common';
import { DataScraperService } from 'src/data-scraper/data-scraper.service';
import { OrdersRepository } from 'src/orders/orders.repository';
import { RegionService } from 'src/region/region.service';
import { SystemService } from 'src/system/system.service';

@Injectable()
export class MarketService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly regionService: RegionService,
    private readonly systemService: SystemService,
    private readonly dataScraperService: DataScraperService,
  ) {}

  async getOrdersByTypeId(typeId: number) {
    console.log(typeId);

    const orders = await this.ordersRepository.find({
      where: { type_id: typeId },
    });

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
      acc[system.id] = {
        name: system.name,
        security_status: system.security_status,
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

    const type = await this.dataScraperService.scrapeType(typeId);

    // TODO: Implement structure scraping
    // const structureIds = locationIds.filter(
    //   (locationId) => locationId.toString().length === 13,
    // );

    return {
      orders,
      regions,
      systems,
      stations,
      type,
    };
  }
}
