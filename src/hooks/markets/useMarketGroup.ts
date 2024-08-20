import { useQuery } from "@tanstack/react-query";
import {
  getMarketsGroupsMarketGroupId,
  GetMarketsGroupsMarketGroupIdData,
} from "../../hey-api";

export function useMarketGroup(id: number) {
  const options: GetMarketsGroupsMarketGroupIdData = {
    path: { market_group_id: id },
  };
  return useQuery({
    queryKey: ["marketGroup", id],
    queryFn: () => getMarketsGroupsMarketGroupId(options),
    select: (response) => response.data,
  });
}
