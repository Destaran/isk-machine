import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { GetUniverseTypesTypeIdResponse } from '../../hey-api';
import { Order, System } from '../../api/market/MarketData';

const marketHubs = [60003760, 60011866, 60008494, 60005686];

interface FilterState {
  active: boolean;
}

interface TextFilterState extends FilterState {
  filter: string;
}

export type FilterKey = 'locationFilter' | 'regionFilter' | 'marketHubsFilter';

interface FilterSwitchPayload {
  type: FilterKey;
  active: boolean;
}

interface MarketState {
  orders: Order[];
  type: null | GetUniverseTypesTypeIdResponse;
  regions: Record<number, string>;
  systems: Record<number, System>;
  stations: Record<number, string>;
  locationFilter: TextFilterState;
  regionFilter: TextFilterState;
  marketHubsFilter: FilterState;
}

const initialState: MarketState = {
  orders: [],
  type: null,
  regions: {},
  systems: {},
  stations: {},
  locationFilter: { active: false, filter: '' },
  regionFilter: { active: false, filter: '' },
  marketHubsFilter: { active: false },
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
    switchFilter: (state, action: PayloadAction<FilterSwitchPayload>) => {
      state[action.payload.type].active = action.payload.active;
    },
  },
});

export const { setData, filterMarketHubs, switchFilter } = marketSlice.actions;

const orders = (state: RootState) => state.market.orders;
export const type = (state: RootState) => state.market.type;
export const regions = (state: RootState) => state.market.regions;
export const systems = (state: RootState) => state.market.systems;
export const stations = (state: RootState) => state.market.stations;
const locationFilter = (state: RootState) => state.market.locationFilter;
const regionFilter = (state: RootState) => state.market.regionFilter;
const marketHubsFilter = (state: RootState) => state.market.marketHubsFilter;

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
        if (stationName.includes(locationFilter.filter)) {
          const matches = orders.filter(
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
        if (regionName.includes(regionFilter.filter)) {
          const matches = orders.filter(
            (order) => order.region_id === Number(regionId)
          );

          result = [...result, ...matches];
        }
      }
      moddedOrders = result;
    }

    if (marketHubsFilter.active) {
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
