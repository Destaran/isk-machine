import { createSelector } from '@reduxjs/toolkit';
import { sorting } from './ordersSlice';
import { selectOrders } from './selectOrders';

export const sortedBuyOrders = createSelector([selectOrders, sorting], (selectOrders, sorting) => {
  const { buy } = selectOrders;

  let sortedOrders = buy;

  if (sorting.buy.key === 'price') {
    sortedOrders = buy.sort((a, b) => {
      if (sorting.buy.direction === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  if (sorting.buy.key === 'volume') {
    sortedOrders = buy.sort((a, b) => {
      if (sorting.buy.direction === 'asc') {
        return a.volume_remain - b.volume_remain;
      } else {
        return b.volume_remain - a.volume_remain;
      }
    });
  }

  return [...sortedOrders];
});
