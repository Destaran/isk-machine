import { useQueries, useQuery } from "@tanstack/react-query";
import { getMarketsGroups, getMarketsGroupsMarketGroupId } from "../../hey-api";

export function useMarketGroups() {
  const { data: response } = useQuery({
    queryKey: ["marketGroups"],
    queryFn: getMarketsGroups,
  });

  const marketGroupIds = response?.data || [];

  return useQueries({
    queries: response?.data
      ? marketGroupIds.map((id) => ({
          queryKey: ["marketGroup", id],
          queryFn: () =>
            getMarketsGroupsMarketGroupId({ path: { market_group_id: id } }),
        }))
      : [],
    combine: (responses) => ({
      data: responses.map((response) => response.data?.data),
      isLoading: responses.some((response) => response.isLoading),
    }),
  });
}
