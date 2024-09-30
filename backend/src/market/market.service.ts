import { Injectable } from '@nestjs/common';
import { DataScraperService } from 'src/data-scraper/data-scraper.service';
import { OrderRepository } from 'src/data-scraper/order.repository';
import { RegionRepository } from 'src/data-scraper/region.repository';
import { SystemRepository } from 'src/data-scraper/system.repository';

@Injectable()
export class MarketService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly regionRepository: RegionRepository,
    private readonly systemRepository: SystemRepository,
    private readonly dataScraperService: DataScraperService,
  ) {}

  async getOrdersByTypeId(typeId: number) {
    const orders = await this.orderRepository.find({
      where: { type_id: typeId },
    });

    const uniquieRegionIds = [
      ...new Set(orders.map((order) => order.region_id)),
    ];

    const uniqueRegions = uniquieRegionIds.map(async (regionId) => {
      return await this.regionRepository.findOneBy({ id: regionId });
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
      return await this.systemRepository.findOneBy({ id: systemId });
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
