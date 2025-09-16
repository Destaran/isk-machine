import { Injectable } from '@nestjs/common';
import { RegionService } from 'src/region/region.service';
import { SystemService } from 'src/system/system.service';
import { OrdersService } from 'src/orders/orders.service';
import { TypesService } from 'src/type/types.service';
import { MetadataService } from 'src/metadata/metadata.service';
import { StationService } from 'src/station/station.service';
import { StructureService } from 'src/structure/structure.service';
import { MarketHistoryService } from 'src/market-history/market-history.service';

@Injectable()
export class MarketService {
  constructor(
    private readonly ordersSerivce: OrdersService,
    private readonly regionService: RegionService,
    private readonly systemService: SystemService,
    private readonly typeService: TypesService,
    private readonly metadataService: MetadataService,
    private readonly stationService: StationService,
    private readonly structureService: StructureService,
    private readonly marketHistoryService: MarketHistoryService,
  ) {}

  async getOpportunities(
    aLocationId: number,
    bLocationId: number,
    marginPercent: number,
    volumePercent: number,
  ) {
    let typeIds: number[];

    if (aLocationId === bLocationId) {
      typeIds = await this.ordersSerivce.getTypesByLocationId(aLocationId);
    } else {
      const fromTypes = await this.ordersSerivce.getTypesByLocationId(aLocationId);
      const toTypes = await this.ordersSerivce.getTypesByLocationId(bLocationId);
      typeIds = fromTypes.filter((aTypeId) =>
        toTypes.some((bTypeId) => bTypeId === aTypeId),
      );
    }

    console.log(`Found ${typeIds.length} types`);

    const marketData = await this.marketHistoryService.getMarketHistories(
      typeIds,
      aLocationId,
    );

    const opportunities = [];

    for (const typeId of typeIds) {
      const orders = await this.ordersSerivce.getByTypeAndLocation(
        typeId,
        aLocationId,
      );

      const marketDataForType = marketData.filter(
        (data) => data.type_id === typeId,
      );

      const sellOrders =
        orders
          .filter((order) => order.is_buy_order === false)
          .sort((a, b) => a.price - b.price) ?? [];

      const buyOrders =
        orders
          .filter((order) => order.is_buy_order === true)
          .sort((a, b) => b.price - a.price) ?? [];

      if (buyOrders[0] === undefined || sellOrders[0] === undefined) {
        continue;
      }

      if (sellOrders[0].price >= buyOrders[0].price * (1 + marginPercent / 100)) {
        const profit = sellOrders[0].price - buyOrders[0].price;
        const profitPercent = ((profit / buyOrders[0].price) * 100).toFixed(2);
        const obj = {
          type: typeId,
          profit,
          profitPercent,
          sellPrice: sellOrders[0].price,
          buyPrice: buyOrders[0].price,
        };
        
        opportunities.push(obj);
      }
    }

    return opportunities;
  }

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

    const uniqueStructureIds = uniquelocationIds.filter(
      (locationId) => locationId.toString().length === 13,
    );

    const uniqueStructures =
      await this.structureService.getByIds(uniqueStructureIds);

    const structures = uniqueStructures.reduce((acc, structure) => {
      acc[structure.id] = structure.name;
      return acc;
    }, {});

    const type = await this.typeService.getById(typeId);
    const scrapeDate = (await this.metadataService.getScrapeDate()).getTime();

    return {
      orders,
      regions,
      systems,
      stations,
      structures,
      type,
      scrapeDate,
    };
  }
}
