import { useEffect, useState } from "react";
import type { OpportunitiesParams } from "../api/market/useGetOpportunities";

const OPPORTUNITY_FILTERS_STORAGE_KEY = "jitaFlipperOpportunityFilters";

const defaultOpportunityFilters: OpportunitiesParams = {
  buyLocation: 60003760,
  sellLocation: 60003760,
  volatility: 0.25,
  margin: 0.2,
  maxMargin: 10,
  dailyProfit: 5000000,
  minVolume: 100,
};

function loadOpportunityFilters(): OpportunitiesParams {
  if (typeof window === "undefined") {
    return defaultOpportunityFilters;
  }

  const storedFilters = window.localStorage.getItem(
    OPPORTUNITY_FILTERS_STORAGE_KEY,
  );

  if (!storedFilters) {
    return defaultOpportunityFilters;
  }

  try {
    const parsedFilters = JSON.parse(storedFilters) as Partial<
      Record<keyof OpportunitiesParams, unknown>
    >;
    const nextFilters = { ...defaultOpportunityFilters };

    for (const key of Object.keys(defaultOpportunityFilters) as Array<
      keyof OpportunitiesParams
    >) {
      const value = parsedFilters[key];

      if (typeof value === "number" && Number.isFinite(value)) {
        nextFilters[key] = value;
      }
    }

    return nextFilters;
  } catch {
    return defaultOpportunityFilters;
  }
}

export function useOpportunityFilters() {
  const [filters, setFilters] = useState<OpportunitiesParams>(
    loadOpportunityFilters,
  );

  useEffect(() => {
    window.localStorage.setItem(
      OPPORTUNITY_FILTERS_STORAGE_KEY,
      JSON.stringify(filters),
    );
  }, [filters]);

  return {
    defaultOpportunityFilters,
    filters,
    setFilters,
  };
}
