import { createSelector } from '@reduxjs/toolkit';
import { sorting } from './ordersSlice';
import { selectOrders } from './selectOrders';

export const sortedSellOrders = createSelector([selectOrders, sorting], (selectOrders, sorting) => {
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

  return [...sortedOrders];
});
