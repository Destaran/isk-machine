import { useQueries, useQuery } from "@tanstack/react-query";
import { getMarketsGroups, getMarketsGroupsMarketGroupId } from "../../hey-api";

export function useMarketGroups() {
  const { data: response } = useQuery({
    queryKey: ["marketGroups"],
    queryFn: getMarketsGroups,
    staleTime: Infinity,
  });

  const marketGroupIds = response?.data || [];

  return useQueries({
    queries: response?.data
      ? marketGroupIds.map((id) => ({
          queryKey: ["marketGroup", id],
          staleTime: Infinity,
          queryFn: () =>
            getMarketsGroupsMarketGroupId({ path: { market_group_id: id } }),
        }))
      : [],
    combine: (responses) => ({
      data: responses.map((response) => response.data?.data),
      isPending: responses.some((response) => response.isPending),
      isError: responses.some((response) => response.isError),
    }),
  });
}
