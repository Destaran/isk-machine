import { post } from "../API";
import { SearchResult } from "./SearchResult";

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
  return await post<SearchResult[]>(`/market/opportunities`, params);
}
