import { useQuery } from "@tanstack/react-query";
import {
  getMarketsRegionIdOrders,
  GetMarketsRegionIdOrdersData,
} from "../../hey-api";

type OrderType = "all" | "buy" | "sell";

interface UseMarketDataParams {
  regionId: number;
  typeId?: number;
  orderType?: OrderType;
}

export function useMarketData(params: UseMarketDataParams) {
  const { regionId, orderType, typeId } = params;
  const options: GetMarketsRegionIdOrdersData = {
    path: { region_id: regionId },
    query: { order_type: orderType ?? "all" },
  };

  if (typeId) {
    options.query.type_id = typeId;
  }

  return useQuery({
    queryKey: ["market", regionId],
    queryFn: () => getMarketsRegionIdOrders(options),
  });
}
