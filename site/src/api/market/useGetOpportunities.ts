import { post } from "../API";

export interface OpportunityResult {
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

export interface OpportunitiesParams {
  buyLocation: number;
  sellLocation: number;
  volatility: number;
  margin: number;
  maxMargin: number;
  dailyProfit: number;
  minVolume: number;
}

export async function getOpportunities(params?: OpportunitiesParams) {
  return await post<OpportunityResult[]>(`/market/opportunities`, params);
}
