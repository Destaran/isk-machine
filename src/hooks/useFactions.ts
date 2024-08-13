import { useQuery } from "@tanstack/react-query";
import { get } from "../API/API";
import { GetUniverseFactionsResponse } from "../hey-api";

async function getFactions() {
  return await get<GetUniverseFactionsResponse>("/universe/factions");
}

export function useAllFactions() {
  return useQuery({
    queryKey: ["factions"],
    queryFn: getFactions,
  });
}
