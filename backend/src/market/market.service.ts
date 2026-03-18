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
import { LocationSearchResult } from './location-search-result.interface';

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
    buyLocation: number = 60003760,
    sellLocation: number = 60003760,
    volatility: number = 0.25,
    margin: number = 0.2,
    maxMargin: number = 10,
    dailyProfit: number = 5000000,
    minVolume: number = 100,
  ) {
    const result = await this.dataSource.query(
      `
      WITH best_buy_prices AS (
          SELECT
              type_id,
          MAX(price) AS best_buy
          FROM orders
        WHERE location_id = $1
        AND is_buy_order
        GROUP BY type_id
      ),
      best_sell_prices AS (
        SELECT
          type_id,
          MIN(price) AS best_sell
        FROM orders
        WHERE location_id = $2
        AND NOT is_buy_order
          GROUP BY type_id
      ),
      order_volumes AS (
          SELECT
              o.type_id,
          SUM(CASE WHEN o.is_buy_order AND o.location_id = $1 AND o.price = bb.best_buy THEN o.volume_remain ELSE 0 END) AS best_buy_volume,
          SUM(CASE WHEN NOT o.is_buy_order AND o.location_id = $2 AND o.price = bs.best_sell THEN o.volume_remain ELSE 0 END) AS best_sell_volume
          FROM orders o
        JOIN best_buy_prices bb ON o.type_id = bb.type_id
        JOIN best_sell_prices bs ON o.type_id = bs.type_id
        WHERE (o.location_id = $1 AND o.is_buy_order)
         OR (o.location_id = $2 AND NOT o.is_buy_order)
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
              bb.best_buy,
              bs.best_sell,
              v.best_buy_volume,
              v.best_sell_volume,
              h.avg_daily_trade_value,
              h.volatility,
              h.days_recorded,
              ((bs.best_sell - bb.best_buy) / NULLIF(bb.best_buy,0)) - 0.056 AS net_margin,
              h.avg_daily_trade_value * 0.05 * (((bs.best_sell - bb.best_buy) / NULLIF(bb.best_buy,0)) - 0.056) AS estimated_daily_profit,
              LEAST(v.best_buy_volume, v.best_sell_volume) AS tradeable_volume
          FROM historical h
          JOIN best_buy_prices bb ON bb.type_id = h.type_id
          JOIN best_sell_prices bs ON bs.type_id = h.type_id
          JOIN order_volumes v ON v.type_id = h.type_id
          JOIN types t ON t.id = h.type_id
          WHERE bb.best_buy IS NOT NULL
            AND bs.best_sell IS NOT NULL
            AND bs.best_sell > bb.best_buy
      )
      SELECT *
      FROM joined
      WHERE days_recorded >= 25
        AND volatility < $3
        AND net_margin >= $4
        AND net_margin <= $5
        AND estimated_daily_profit >= $6
        AND tradeable_volume >= $7
      ORDER BY net_margin DESC
      LIMIT 150;
    `,
      [
        buyLocation,
        sellLocation,
        volatility,
        margin,
        maxMargin,
        dailyProfit,
        minVolume,
      ],
    );

    return result;
  }

  async searchTypes(search: string) {
    return await this.typeService.searchByName(search);
  }

  async searchLocations(search: string): Promise<LocationSearchResult[]> {
    const trimmedSearch = search?.trim();

    if (!trimmedSearch || trimmedSearch.length < 2) {
      return [];
    }

    const wildcardSearch = `%${trimmedSearch.replace(/\s+/g, '%')}%`;
    const rows = await this.dataSource.query(
      `
      SELECT id::text as id, name, kind
      FROM (
        SELECT s.id::bigint AS id, s.name, 'station'::text AS kind
        FROM station s
        WHERE s.name ILIKE $1

        UNION ALL

        SELECT st.id::bigint AS id, st.name, 'structure'::text AS kind
        FROM structure st
        WHERE st.name ILIKE $1
      ) AS locations
      ORDER BY
        CASE
          WHEN LOWER(name) = LOWER($2) THEN 0
          WHEN LOWER(name) LIKE LOWER($2 || '%') THEN 1
          WHEN POSITION(LOWER($2) IN LOWER(name)) > 0 THEN 2
          ELSE 3
        END,
        LENGTH(name) ASC
      LIMIT 20;
    `,
      [wildcardSearch, trimmedSearch],
    );

    return rows.map(
      (row: { id: string; name: string; kind: 'station' | 'structure' }) => ({
        id: Number(row.id),
        name: row.name,
        kind: row.kind,
      }),
    );
  }

  async getLocationById(id: number): Promise<LocationSearchResult | null> {
    const [station] = await this.dataSource.query(
      `
      SELECT id::text as id, name, 'station'::text AS kind
      FROM station
      WHERE id = $1
      LIMIT 1;
    `,
      [id],
    );

    if (station) {
      return {
        id: Number(station.id),
        name: station.name,
        kind: station.kind,
      };
    }

    const [structure] = await this.dataSource.query(
      `
      SELECT id::text as id, name, 'structure'::text AS kind
      FROM structure
      WHERE id = $1
      LIMIT 1;
    `,
      [id],
    );

    if (structure) {
      return {
        id: Number(structure.id),
        name: structure.name,
        kind: structure.kind,
      };
    }

    return null;
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
