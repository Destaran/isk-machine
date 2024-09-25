import { createSlice } from '@reduxjs/toolkit';
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
  },
});

export const { setOrders, resetOrders } = marketSlice.actions;

export const selectOrders = (state: RootState) => {
  let orders = state.market.orders;

  if (state.market.location) {
    orders = orders.filter(
      (order) => order.location_id === state.market.location
    );
  }

  const buy = orders
    .filter((order) => order.is_buy_order)
    .sort((a, b) => b.price - a.price);

  const sell = orders
    .filter((order) => !order.is_buy_order)
    .sort((a, b) => a.price - b.price);

  return { buy, sell };
};

export default marketSlice.reducer;
