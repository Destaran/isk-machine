import { createSelector } from '@reduxjs/toolkit';
import { Order } from '../../api/market/MarketData';
import {
  orders,
  regions,
  stations,
  locationFilter,
  regionFilter,
  marketHubsFilter,
} from './ordersSlice';

const marketHubs = [60003760, 60011866, 60008494, 60005686];

export const selectOrders = createSelector(
  [orders, regions, stations, locationFilter, regionFilter, marketHubsFilter],
  (
    orders,
    regions,
    stations,
    locationFilter,
    regionFilter,
    marketHubsFilter
  ) => {
    let moddedOrders = orders;

    if (locationFilter.active) {
      let result: Order[] = [];

      for (const [stationId, stationName] of Object.entries(stations)) {
        if (
          stationName
            .toLowerCase()
            .includes(locationFilter.filter.toLocaleLowerCase())
        ) {
          const matches = moddedOrders.filter(
            (order) => Number(order.location_id) === Number(stationId)
          );

          result = [...result, ...matches];
        }
      }
      moddedOrders = result;
    }

    if (regionFilter.active) {
      let result: Order[] = [];

      for (const [regionId, regionName] of Object.entries(regions)) {
        if (
          regionName
            .toLocaleLowerCase()
            .includes(regionFilter.filter.toLocaleLowerCase())
        ) {
          const matches = moddedOrders.filter(
            (order) => order.region_id === Number(regionId)
          );

          result = [...result, ...matches];
        }
      }
      moddedOrders = result;
    }

    if (marketHubsFilter.active) {
      moddedOrders = moddedOrders.filter((order) =>
        marketHubs.includes(Number(order.location_id))
      );
    }

    const buy = moddedOrders
      .filter((order) => order.is_buy_order)
      .sort((a, b) => b.price - a.price);

    const sell = moddedOrders
      .filter((order) => !order.is_buy_order)
      .sort((a, b) => a.price - b.price);

    return { buy, sell };
  }
);
