import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "../API";
import { MarketOrder } from "../types";

export type OrderType = "buy" | "sell" | "all";

async function getMarketData(
  regionId: number,
  typeId: number | null,
  orderType: OrderType
) {
  if (!regionId) {
    throw new Error("Region id is required");
  }
  return await get<MarketOrder[]>(
    `/markets/${regionId}/orders/?datasource=tranquility&order_type=${orderType}&page=1${
      typeId ? `&type_id=${typeId}` : ""
    }`
  );
}

export function useMarketData(
  regionId: number,
  typeId: number | null = null,
  orderType: OrderType = "all"
) {
  const getCurrentRegion = useCallback(
    async () => await getMarketData(regionId, typeId, orderType),
    [orderType, regionId, typeId]
  );

  return useQuery({
    queryKey: ["market", regionId],
    queryFn: getCurrentRegion,
  });
}
