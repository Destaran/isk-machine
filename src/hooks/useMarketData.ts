import { useQuery } from "@tanstack/react-query";
import {
  getMarketsRegionIdOrders,
  GetMarketsRegionIdOrdersData,
} from "../hey-api";
import { useCallback } from "react";

export function useMarketData(regionId: number) {
  const getCurrentRegion = useCallback(async () => {
    const options: GetMarketsRegionIdOrdersData = {
      path: { region_id: regionId },
      query: { order_type: "all" },
    };
    return await getMarketsRegionIdOrders(options);
  }, [regionId]);
  return useQuery({
    queryKey: ["market", regionId],
    queryFn: getCurrentRegion,
  });
}
