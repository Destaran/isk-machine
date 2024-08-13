import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "../API/API";
import { GetMarketsRegionIdOrdersResponse } from "../hey-api";

export type OrderType = "buy" | "sell" | "all";

async function getMarketData(
  regionId: number,
  typeId: number | null,
  page: string,
  orderType: OrderType
) {
  if (!regionId) {
    throw new Error("Region id is required");
  }
  return await get<GetMarketsRegionIdOrdersResponse>(
    `/markets/${regionId}/orders/?datasource=tranquility&order_type=${orderType}&page=${page}${
      typeId ? `&type_id=${typeId}` : ""
    }`
  );
}

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
