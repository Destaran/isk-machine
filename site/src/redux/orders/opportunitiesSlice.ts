import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Opportunity {
  type_id: number;
  item_name: string;
  best_buy: number;
  best_sell: number;
  best_buy_volume: number;
  best_sell_volume: number;
  avg_daily_trade_value: number;
  volatility: number;
  days_recorded: number;
  net_margin: number;
  estimated_daily_profit: number;
  tradeable_volume: number;
}

interface OpportunitiesState {
  opportunities: Opportunity[];
}

function loadFromStorage(): Opportunity[] {
  try {
    const stored = localStorage.getItem("opportunities");
    return stored ? (JSON.parse(stored) as Opportunity[]) : [];
  } catch {
    return [];
  }
}

const initialState: OpportunitiesState = {
  opportunities: loadFromStorage(),
};

export const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {
    setOpportunities: (state, action) => {
      state.opportunities = action.payload;
    },
  },
});

export const opportunities = (state: RootState) =>
  state.opportunities.opportunities;

export const { setOpportunities } = opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;
