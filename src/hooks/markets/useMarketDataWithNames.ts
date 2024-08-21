import { useQuery } from "@tanstack/react-query";
import {
  getMarketsRegionIdOrders,
  GetMarketsRegionIdOrdersData,
  postUniverseNames,
} from "../../hey-api";
import { getUniqueLocIds } from "./getUniqueIds";

interface UseMarketDataParams {
  regionId: number;
  typeId?: number;
  isBuy?: boolean;
}

export function useMarketDataWithNames(params: UseMarketDataParams) {
  const { regionId, typeId, isBuy } = params;
  const marketsOptions: GetMarketsRegionIdOrdersData = {
    path: { region_id: regionId },
    query: { order_type: isBuy ? "buy" : "sell", type_id: typeId },
  };

  if (typeId) {
    marketsOptions.query.type_id = typeId;
  }

  const { data: orders } = useQuery({
    queryKey: ["market", regionId, typeId, isBuy],
    queryFn: () => getMarketsRegionIdOrders(marketsOptions),
    select: (response) => ({
      data: response.data,
      ids: getUniqueLocIds(response.data ?? []),
    }),
  });

  const namesOptions = {
    body: orders?.ids,
  };

  return useQuery({
    queryKey: ["names", orders?.ids],
    staleTime: Infinity,
    enabled: !!orders?.data,
    queryFn: () => postUniverseNames(namesOptions),
    select: (response) =>
      orders
        ? orders?.data?.map((order) => {
            const name = response?.data?.find(
              (name) => name.id === order.location_id
            );
            return { ...order, location: name?.name ?? "Unknown" };
          })
        : [],
  });
}
