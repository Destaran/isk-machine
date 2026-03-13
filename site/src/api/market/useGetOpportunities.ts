import { get } from "../API";
import { SearchResult } from "./SearchResult";

interface OpportunitiesParams {
  buyLocation: number;
  sellLocation: number;
  volatility: number;
  margin: number;
  dailyProfit: number;
  minVolume: number;
}

export async function getOpportunities(params?: OpportunitiesParams) {
  return await get<SearchResult[], OpportunitiesParams>(
    `/market/opportunities`,
    params,
  );
}
