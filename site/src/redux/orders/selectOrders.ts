import { createSelector } from '@reduxjs/toolkit';
import { Order } from '../../api/market/MarketData';
import {
  excludeNullSecFilter,
  excludeLowSecFilter,
  excludeHighSecFilter,
  excludeStationsFilter,
  excludeStructuresFilter,
  orders,
  regions,
  systems,
  stations,
  locationFilter,
  regionFilter,
  marketHubsFilter,
} from './ordersSlice';

const marketHubs = [60003760, 60011866, 60008494, 60005686];

export const selectOrders = createSelector(
  [
    orders,
    regions,
    systems,
    stations,
    excludeNullSecFilter,
    excludeLowSecFilter,
    excludeHighSecFilter,
    excludeStationsFilter,
    excludeStructuresFilter,
    locationFilter,
    regionFilter,
    marketHubsFilter,
  ],
  (
    orders,
    regions,
    systems,
    stations,
    excludeNullSecFilter,
    excludeLowSecFilter,
    excludeHighSecFilter,
    excludeStationsFilter,
    excludeStructuresFilter,
    locationFilter,
    regionFilter,
    marketHubsFilter
  ) => {
    let moddedOrders = orders;

    if (excludeNullSecFilter.active) {
      moddedOrders = moddedOrders.filter(
        (order) => Number(systems[order.system_id].security_status) > 0
      );
    }

    if (excludeLowSecFilter.active) {
      moddedOrders = moddedOrders.filter((order) => {
        const securityStatus = Number(systems[order.system_id].security_status);
        return securityStatus === 0 || securityStatus >= 0.5;
      });
    }

    if (excludeHighSecFilter.active) {
      moddedOrders = moddedOrders.filter(
        (order) => Number(systems[order.system_id].security_status) < 0.5
      );
    }

    if (excludeStationsFilter.active) {
      moddedOrders = moddedOrders.filter((order) => order.location_id.toString().length !== 8);
    }

    if (excludeStructuresFilter.active) {
      moddedOrders = moddedOrders.filter((order) => order.location_id.toString().length !== 13);
    }

    if (locationFilter.active) {
      let result: Order[] = [];

      for (const [stationId, stationName] of Object.entries(stations)) {
        if (stationName.toLowerCase().includes(locationFilter.filter.toLocaleLowerCase())) {
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
        if (regionName.toLocaleLowerCase().includes(regionFilter.filter.toLocaleLowerCase())) {
          const matches = moddedOrders.filter((order) => order.region_id === Number(regionId));

          result = [...result, ...matches];
        }
      }
      moddedOrders = result;
    }

    if (marketHubsFilter.active) {
      moddedOrders = moddedOrders.filter((order) => marketHubs.includes(Number(order.location_id)));
    }

    const buy = moddedOrders.filter((order) => order.is_buy_order);

    const sell = moddedOrders.filter((order) => !order.is_buy_order);

    return { buy, sell };
  }
);
