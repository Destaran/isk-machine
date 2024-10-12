import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Order, System } from '../../api/market/MarketData';

interface FilterState {
  active: boolean;
}

interface TextFilterState extends FilterState {
  filter: string;
}

export type FilterKey =
  | 'marketHubsFilter'
  | 'excludeNullSecFilter'
  | 'excludeLowSecFilter'
  | 'excludeHighSecFilter'
  | 'excludeStationsFilter'
  | 'excludeStructuresFilter';
export type TextFilterKey = 'locationFilter' | 'regionFilter';

interface FilterSwitchPayload {
  type: FilterKey | TextFilterKey;
  active: boolean;
}

interface FilterTextPayload {
  type: TextFilterKey;
  filter: string;
}

export interface Type {
  id: number;
  name: string;
  capacity: number;
  description: string;
  group_id: number;
  market_group_id: number;
  mass: number;
  packaged_volume: number;
  portion_size: number;
  published: boolean;
  volume: number;
}

interface MarketState {
  orders: Order[];
  scrapeDate: null | number;
  type: null | Type;
  regions: Record<number, string>;
  systems: Record<number, System>;
  stations: Record<number, string>;
  excludeNullSecFilter: FilterState;
  excludeLowSecFilter: FilterState;
  excludeHighSecFilter: FilterState;
  excludeStationsFilter: FilterState;
  excludeStructuresFilter: FilterState;
  locationFilter: TextFilterState;
  regionFilter: TextFilterState;
  marketHubsFilter: FilterState;
}

const initialState: MarketState = {
  orders: [],
  scrapeDate: null,
  type: null,
  regions: {},
  systems: {},
  stations: {},
  locationFilter: { active: false, filter: 'Jita IV - Moon 4 - Caldari Navy' },
  regionFilter: { active: false, filter: 'The Forge' },
  marketHubsFilter: { active: false },
  excludeNullSecFilter: { active: false },
  excludeLowSecFilter: { active: false },
  excludeHighSecFilter: { active: false },
  excludeStationsFilter: { active: false },
  excludeStructuresFilter: { active: false },
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.orders = action.payload.orders;
      state.scrapeDate = action.payload.scrapeDate;
      state.regions = action.payload.regions;
      state.systems = action.payload.systems;
      state.stations = action.payload.stations;
      state.type = action.payload.type;
    },
    resetData: (state) => {
      state.orders = [];
      state.regions = {};
      state.systems = {};
      state.stations = {};
      state.type = null;
    },
    filterMarketHubs: (state, action) => {
      state.marketHubsFilter = action.payload;
    },
    switchFilter: (state, action: PayloadAction<FilterSwitchPayload>) => {
      state[action.payload.type].active = action.payload.active;
    },
    setFilter: (state, action: PayloadAction<FilterTextPayload>) => {
      state[action.payload.type].filter = action.payload.filter;
    },
  },
});

export const { setData, resetData, filterMarketHubs, switchFilter, setFilter } =
  marketSlice.actions;

export const orders = (state: RootState) => state.market.orders;
export const scrapeDate = (state: RootState) => state.market.scrapeDate;
export const type = (state: RootState) => state.market.type;
export const regions = (state: RootState) => state.market.regions;
export const systems = (state: RootState) => state.market.systems;
export const stations = (state: RootState) => state.market.stations;

export const excludeNullSecFilter = (state: RootState) => state.market.excludeNullSecFilter;
export const excludeLowSecFilter = (state: RootState) => state.market.excludeLowSecFilter;
export const excludeHighSecFilter = (state: RootState) => state.market.excludeHighSecFilter;
export const excludeStationsFilter = (state: RootState) => state.market.excludeStationsFilter;
export const excludeStructuresFilter = (state: RootState) => state.market.excludeStructuresFilter;

export const locationFilter = (state: RootState) => state.market.locationFilter;
export const regionFilter = (state: RootState) => state.market.regionFilter;
export const marketHubsFilter = (state: RootState) => state.market.marketHubsFilter;

export default marketSlice.reducer;
