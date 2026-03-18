import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "../API";
import type { LocationSearchResult } from "./LocationSearchResult";

async function searchLocations(searchTerm: string) {
  return await get<LocationSearchResult[], { s: string }>(
    "/market/locations/search",
    {
      s: searchTerm,
    },
  );
}

export async function getLocationById(id: number) {
  return await get<LocationSearchResult | null>(`/market/locations/${id}`);
}

export function useSearchLocations(searchTerm: string, enabled: boolean) {
  const searchCurrentLocations = useCallback(
    async () => await searchLocations(searchTerm),
    [searchTerm],
  );

  return useQuery({
    queryKey: ["location-search", searchTerm],
    queryFn: searchCurrentLocations,
    enabled,
  });
}
