import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { GetUniverseTypesTypeIdResponse } from '../../hey-api';
import { Order, System } from '../../api/market/MarketData';

const marketHubs = [60003760, 60011866, 60008494, 60005686];

interface MarketState {
  region: null | number;
  marketHubsFilter: boolean;
  type: null | GetUniverseTypesTypeIdResponse;
  orders: Order[];
  regions: Record<number, string>;
  systems: Record<number, System>;
  stations: Record<number, string>;
}

const initialState: MarketState = {
  region: null,
  marketHubsFilter: false,
  type: null,
  orders: [],
  regions: {},
  systems: {},
  stations: {},
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.orders = action.payload.orders;
      state.regions = action.payload.regions;
      state.systems = action.payload.systems;
      state.stations = action.payload.stations;
      state.type = action.payload.type;
    },
    filterMarketHubs: (state, action) => {
      state.marketHubsFilter = action.payload;
    },
  },
});

export const { setData, filterMarketHubs } = marketSlice.actions;

export const type = (state: RootState) => state.market.type;
const region = (state: RootState) => state.market.region;
const marketHubsFilter = (state: RootState) => state.market.marketHubsFilter;
const orders = (state: RootState) => state.market.orders;
export const regions = (state: RootState) => state.market.regions;
export const systems = (state: RootState) => state.market.systems;
export const stations = (state: RootState) => state.market.stations;

export const selectOrders = createSelector(
  [orders, region, marketHubsFilter],
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
