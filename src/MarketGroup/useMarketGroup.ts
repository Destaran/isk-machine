import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "../API";
import { MarketGroup } from "../types";

async function getMarketGroup(id: number) {
  if (!id) {
    throw new Error("Region id is required");
  }
  return await get<MarketGroup>(`/markets/groups/${id}`);
}

export function useMarketGroup(id: number) {
  const getCurrentMarketGroup = useCallback(
    async () => await getMarketGroup(id),
    [id]
  );

  return useQuery({ queryKey: ["region", id], queryFn: getCurrentMarketGroup });
}
