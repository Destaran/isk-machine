import { Injectable } from '@nestjs/common';
import { RegionService } from 'src/region/region.service';
import { SystemService } from 'src/system/system.service';
import { OrdersService } from 'src/orders/orders.service';
import { TypesService } from 'src/type/types.service';
import { MetadataService } from 'src/metadata/metadata.service';
import { StationService } from 'src/station/station.service';

@Injectable()
export class MarketService {
  constructor(
    private readonly ordersSerivce: OrdersService,
    private readonly regionService: RegionService,
    private readonly systemService: SystemService,
    private readonly typeService: TypesService,
    private readonly metadataService: MetadataService,
    private readonly stationService: StationService,
  ) {}

  async searchTypes(search: string) {
    return await this.typeService.searchByName(search);
  }

  async getOrdersByTypeId(typeId: number) {
    const orders = await this.ordersSerivce.getByTypeId(typeId);

    const uniquieRegionIds = [
      ...new Set(orders.map((order) => order.region_id)),
    ];

    const uniqueRegions = await this.regionService.getByIds(uniquieRegionIds);

    const regions = uniqueRegions.reduce((acc, region) => {
      acc[region.id] = region.name;
      return acc;
    }, {});

    const uniqueSystemIds = [
      ...new Set(orders.map((order) => order.system_id)),
    ];

    const uniqueSystems = await this.systemService.getByIds(uniqueSystemIds);

    const systems = uniqueSystems.reduce((acc, system) => {
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

    const uniquelocationIds = [
      ...new Set(orders.map((order) => order.location_id)),
    ];

    const uniqueStationIds = uniquelocationIds.filter(
      (locationId) => locationId.toString().length === 8,
    );

    const uniqueStations = await this.stationService.getByIds(uniqueStationIds);

    const stations = uniqueStations.reduce((acc, station) => {
      acc[station.id] = station.name;
      return acc;
    }, {});

    // TODO: Implement structure scraping
    // const uniqueStructureIds = uniquelocationIds.filter(
    //   (locationId) => locationId.toString().length === 13,
    // );

    const type = await this.typeService.getById(typeId);
    const scrapeDate = (await this.metadataService.getScrapeDate()).getTime();

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
