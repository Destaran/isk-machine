import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { GetUniverseTypesTypeIdResponse } from '../../hey-api';
import { Order, System } from '../../api/market/MarketData';

interface FilterState {
  active: boolean;
}

interface TextFilterState extends FilterState {
  filter: string;
}

export type FilterKey = 'marketHubsFilter';
export type TextFilterKey = 'locationFilter' | 'regionFilter';

interface FilterSwitchPayload {
  type: FilterKey | TextFilterKey;
  active: boolean;
}

interface FilterTextPayload {
  type: TextFilterKey;
  filter: string;
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
  locationFilter: { active: false, filter: 'Jita IV - Moon 4 - Caldari Navy' },
  regionFilter: { active: false, filter: 'The Forge' },
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
    setFilter: (state, action: PayloadAction<FilterTextPayload>) => {
      console.log(action.payload);

      state[action.payload.type].filter = action.payload.filter;
    },
  },
});

export const { setData, filterMarketHubs, switchFilter, setFilter } =
  marketSlice.actions;

export const orders = (state: RootState) => state.market.orders;
export const type = (state: RootState) => state.market.type;
export const regions = (state: RootState) => state.market.regions;
export const systems = (state: RootState) => state.market.systems;
export const stations = (state: RootState) => state.market.stations;
export const locationFilter = (state: RootState) => state.market.locationFilter;
export const regionFilter = (state: RootState) => state.market.regionFilter;
export const marketHubsFilter = (state: RootState) =>
  state.market.marketHubsFilter;

export default marketSlice.reducer;
