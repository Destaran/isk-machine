import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { GetUniverseTypesTypeIdResponse } from '../../hey-api';
import { Order, System } from '../../api/market/MarketData';

interface MarketState {
  region: null | number;
  location: null | number;
  type: null | GetUniverseTypesTypeIdResponse;
  orders: Order[];
  regions: Record<number, string>;
  systems: Record<number, System>;
  stations: Record<number, string>;
}

const initialState: MarketState = {
  region: null,
  location: null,
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
  },
});

export const { setData } = marketSlice.actions;

export const type = (state: RootState) => state.market.type;
const region = (state: RootState) => state.market.region;
const location = (state: RootState) => state.market.location;
const orders = (state: RootState) => state.market.orders;
export const regions = (state: RootState) => state.market.regions;
export const systems = (state: RootState) => state.market.systems;
export const stations = (state: RootState) => state.market.stations;

export const selectOrders = createSelector(
  [orders, region, location],
  (orders, region, location) => {
    let moddedOrders = orders;

    if (region) {
      moddedOrders = orders.filter((order) => order.region_id === region);
    }

    if (location) {
      moddedOrders = orders.filter((order) => order.location_id === location);
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
