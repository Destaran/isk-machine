import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
  GetMarketsRegionIdOrdersResponse,
  GetUniverseTypesTypeIdResponse,
} from '../../hey-api';

interface MarketState {
  type: null | GetUniverseTypesTypeIdResponse;
  region: number;
  location: null | number;
  orders: GetMarketsRegionIdOrdersResponse;
}

const initialState: MarketState = {
  type: null,
  region: 10000002,
  location: null,
  orders: [],
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setOrders: (
      state,
      action: PayloadAction<GetMarketsRegionIdOrdersResponse>
    ) => {
      state.orders = action.payload;
    },
    resetOrders: (state) => {
      state.orders = [];
    },
    setType: (
      state,
      action: PayloadAction<null | GetUniverseTypesTypeIdResponse>
    ) => {
      state.type = action.payload;
    },
  },
});

export const { setOrders, resetOrders, setType } = marketSlice.actions;

export const type = (state: RootState) => state.market.type;
// const region = (state: RootState) => state.market.region;
const location = (state: RootState) => state.market.location;
const orders = (state: RootState) => state.market.orders;

export const selectOrders = createSelector(
  [orders, location],
  (orders, location) => {
    let moddedOrders = orders;

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
