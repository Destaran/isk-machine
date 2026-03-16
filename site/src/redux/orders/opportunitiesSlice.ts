import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  OpportunitiesParams,
  OpportunityResult,
} from "../../api/market/useGetOpportunities";
import { RootState } from "../store";

const OPPORTUNITIES_STORAGE_KEY = "opportunities";
const OPPORTUNITY_QUERY_STORAGE_KEY = "jitaFlipperLastOpportunityQuery";
const OPPORTUNITY_FETCHED_AT_STORAGE_KEY =
  "jitaFlipperLastOpportunityFetchedAt";

export type Opportunity = OpportunityResult;

interface OpportunitiesState {
  opportunities: Opportunity[];
  lastQuery: OpportunitiesParams | null;
  lastFetchedAt: string | null;
}

function loadFromStorage(): Opportunity[] {
  try {
    const stored = localStorage.getItem(OPPORTUNITIES_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Opportunity[]) : [];
  } catch {
    return [];
  }
}

function loadLastQuery(): OpportunitiesParams | null {
  try {
    const stored = localStorage.getItem(OPPORTUNITY_QUERY_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as OpportunitiesParams) : null;
  } catch {
    return null;
  }
}

function loadLastFetchedAt(): string | null {
  try {
    return localStorage.getItem(OPPORTUNITY_FETCHED_AT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export interface SetOpportunitiesPayload {
  opportunities: Opportunity[];
  params: OpportunitiesParams;
  fetchedAt: string;
}

export function persistOpportunities(payload: SetOpportunitiesPayload) {
  localStorage.setItem(
    OPPORTUNITIES_STORAGE_KEY,
    JSON.stringify(payload.opportunities),
  );
  localStorage.setItem(
    OPPORTUNITY_QUERY_STORAGE_KEY,
    JSON.stringify(payload.params),
  );
  localStorage.setItem(OPPORTUNITY_FETCHED_AT_STORAGE_KEY, payload.fetchedAt);
}

const initialState: OpportunitiesState = {
  opportunities: loadFromStorage(),
  lastQuery: loadLastQuery(),
  lastFetchedAt: loadLastFetchedAt(),
};

export const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {
    setOpportunities: (
      state,
      action: PayloadAction<SetOpportunitiesPayload>,
    ) => {
      state.opportunities = action.payload.opportunities;
      state.lastQuery = action.payload.params;
      state.lastFetchedAt = action.payload.fetchedAt;
    },
  },
});

export const opportunities = (state: RootState) =>
  state.opportunities.opportunities;
export const lastOpportunityQuery = (state: RootState) =>
  state.opportunities.lastQuery;
export const lastOpportunityFetchedAt = (state: RootState) =>
  state.opportunities.lastFetchedAt;

export const { setOpportunities } = opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;
