import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { GetUniverseTypesTypeIdResponse } from '../../hey-api';
import { Order } from '../../api/market/MarketData';

const marketHubs = [60003760, 60011866, 60008494, 60005686];

interface MarketState {
  orders: Order[];
  type: null | GetUniverseTypesTypeIdResponse;
  marketHubsFilter: boolean;
  regionFilter: number | null;
}

const initialState: MarketState = {
  regionFilter: null,
  marketHubsFilter: false,
  type: null,
  orders: [],
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.orders = action.payload.orders;
      state.type = action.payload.type;
    },
    filterMarketHubs: (state, action) => {
      state.marketHubsFilter = action.payload;
    },
  },
});

export const { setData, filterMarketHubs } = marketSlice.actions;

const orders = (state: RootState) => state.market.orders;
export const type = (state: RootState) => state.market.type;
const regionFilter = (state: RootState) => state.market.regionFilter;
const marketHubsFilter = (state: RootState) => state.market.marketHubsFilter;

export const selectOrders = createSelector(
  [orders, regionFilter, marketHubsFilter],
  (orders, region, marketHubsFilter) => {
    let moddedOrders = orders;

    if (region) {
      moddedOrders = orders.filter((order) => order.region_id === region);
    }

    if (marketHubsFilter) {
      moddedOrders = orders.filter((order) =>
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

export default marketSlice.reducer;
