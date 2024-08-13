import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMarketData, OrderType } from "../API/markets";

export function useMarketData(
  regionId: number,
  typeId: number | null = null,
  page: string = "1",
  orderType: OrderType = "all"
) {
  const getCurrentRegion = useCallback(
    async () => await getMarketData(regionId, typeId, page, orderType),
    [orderType, page, regionId, typeId]
  );

  return useQuery({
    queryKey: ["market", regionId],
    queryFn: getCurrentRegion,
  });
}
