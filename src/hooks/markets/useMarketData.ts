import { useQuery } from "@tanstack/react-query";
import {
  getMarketsRegionIdOrders,
  GetMarketsRegionIdOrdersData,
} from "../../hey-api";

interface UseMarketDataParams {
  regionId: number;
  typeId?: number;
  isBuy?: boolean;
}

export function useMarketData(params: UseMarketDataParams) {
  const { regionId, typeId, isBuy } = params;
  const options: GetMarketsRegionIdOrdersData = {
    path: { region_id: regionId },
    query: { order_type: isBuy ? "buy" : "sell", type_id: typeId },
  };

  if (typeId) {
    options.query.type_id = typeId;
  }

  return useQuery({
    queryKey: ["market", regionId, isBuy],
    queryFn: () => getMarketsRegionIdOrders(options),
  });
}
