import { Injectable } from '@nestjs/common';
import { RegionService } from 'src/region/region.service';
import { SystemService } from 'src/system/system.service';
import { OrdersService } from 'src/orders/orders.service';
import { TypesService } from 'src/type/types.service';
import { MetadataService } from 'src/metadata/metadata.service';
import { StationService } from 'src/station/station.service';
import { StructureService } from 'src/structure/structure.service';
import { MarketHistoryService } from 'src/market-history/market-history.service';
import { DataSource } from 'typeorm';

@Injectable()
export class MarketService {
  constructor(
    private dataSource: DataSource,
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
    // buyLocationId: number,
    // sellLocationId: number | null,
    // marginPercent: number = 20,
    // volumePercent: number = 5,
    // dailyMinimumProfit: number = 5000000,
  ) {
    const result = await this.dataSource.query(`
      WITH best_prices AS (
          SELECT
              type_id,
              MAX(CASE WHEN is_buy_order THEN price END) AS best_buy,
              MIN(CASE WHEN NOT is_buy_order THEN price END) AS best_sell
          FROM orders
          WHERE location_id = $1
          GROUP BY type_id
      ),
      order_volumes AS (
          SELECT
              o.type_id,
              SUM(CASE WHEN is_buy_order AND o.price = b.best_buy THEN o.volume_remain ELSE 0 END) AS best_buy_volume,
              SUM(CASE WHEN NOT is_buy_order AND o.price = b.best_sell THEN o.volume_remain ELSE 0 END) AS best_sell_volume
          FROM orders o
          JOIN best_prices b ON o.type_id = b.type_id
          WHERE o.location_id = $1
          GROUP BY o.type_id
      ),
      historical AS (
          SELECT
              type_id,
              AVG(volume) AS avg_volume,
              AVG(average) AS avg_price,
              AVG(volume * average) AS avg_daily_trade_value,
              STDDEV(average) / NULLIF(AVG(average), 0) AS volatility,
              COUNT(*) AS days_recorded
          FROM market_history
          WHERE date >= CURRENT_DATE - INTERVAL '30 days'
          GROUP BY type_id
      ),
      joined AS (
          SELECT
              h.type_id,
              t.name AS item_name,
              b.best_buy,
              b.best_sell,
              v.best_buy_volume,
              v.best_sell_volume,
              h.avg_daily_trade_value,
              h.volatility,
              h.days_recorded,
              ((b.best_sell - b.best_buy) / NULLIF(b.best_buy,0)) - 0.056 AS net_margin,
              h.avg_daily_trade_value * 0.05 * (((b.best_sell - b.best_buy) / NULLIF(b.best_buy,0)) - 0.056) AS estimated_daily_profit,
              LEAST(v.best_buy_volume, v.best_sell_volume) AS tradeable_volume
          FROM historical h
          JOIN best_prices b ON b.type_id = h.type_id
          JOIN order_volumes v ON v.type_id = h.type_id
          JOIN types t ON t.id = h.type_id
          WHERE b.best_buy IS NOT NULL
            AND b.best_sell IS NOT NULL
            AND b.best_sell > b.best_buy
      )
      SELECT *
      FROM joined
      WHERE days_recorded >= 25
        AND volatility < 0.25
        AND net_margin >= 0.20
        AND estimated_daily_profit >= 10000000
        AND tradeable_volume >= 100
      ORDER BY estimated_daily_profit / (1 + volatility) DESC
      LIMIT 50;
    `, [60003760]);

    return result;
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
