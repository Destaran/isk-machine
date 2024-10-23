import { createSelector } from '@reduxjs/toolkit';
import { regions, sorting } from './ordersSlice';
import { selectOrders } from './selectOrders';

export const sortedSellOrders = createSelector(
  [selectOrders, sorting, regions],
  (selectOrders, sorting, regions) => {
    const { sell } = selectOrders;

    let sortedOrders = sell;

    if (sorting.sell.key === 'price') {
      sortedOrders = sell.sort((a, b) => {
        if (sorting.sell.direction === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    if (sorting.sell.key === 'volume') {
      sortedOrders = sell.sort((a, b) => {
        if (sorting.sell.direction === 'asc') {
          return a.volume_remain - b.volume_remain;
        } else {
          return b.volume_remain - a.volume_remain;
        }
      });
    }

    if (sorting.sell.key === 'region') {
      sortedOrders = sortedOrders.sort((a, b) => {
        const regionA = regions[a.region_id];
        const regionB = regions[b.region_id];

        if (sorting.sell.direction === 'asc') {
          return regionA.localeCompare(regionB);
        } else {
          return regionB.localeCompare(regionA);
        }
      });
    }

    if (sorting.sell.key === 'location') {
      sortedOrders = sortedOrders.sort((a, b) => {
        const stationA = regions[a.location_id];
        const stationB = regions[b.location_id];

        if (sorting.sell.direction === 'asc') {
          return stationA.localeCompare(stationB);
        } else {
          return stationB.localeCompare(stationA);
        }
      });
    }

    return [...sortedOrders];
  }
);
