import { get } from "../API/API";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  GetMarketsGroupsMarketGroupIdResponse,
  GetMarketsGroupsResponse,
} from "../hey-api";

async function getMarketGroup(id: number) {
  return await get<GetMarketsGroupsMarketGroupIdResponse>(
    `/markets/groups/${id}`
  );
}

async function getMarketGroups() {
  return await get<GetMarketsGroupsResponse>("/markets/groups");
}

export function useMarketGroup(id: number) {
  return useQuery({
    queryKey: ["marketGroup", id],
    queryFn: () => getMarketGroup(id),
  });
}

export function useMarketGroups(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["marketGroups", id],
            queryFn: () => getMarketGroup(id),
          };
        })
      : [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      };
    },
  });
}

export function useAllMarketGroups() {
  const { data: marketGroupIds } = useQuery({
    queryKey: ["marketGroups"],
    queryFn: getMarketGroups,
  });

  return useMarketGroups(marketGroupIds ?? []);
}
