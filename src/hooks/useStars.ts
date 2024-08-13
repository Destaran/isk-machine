import { useQueries, useQuery } from "@tanstack/react-query";
import { get } from "../API/API";
import { GetUniverseStarsStarIdResponse } from "../hey-api";

async function getStar(id: number) {
  return await get<GetUniverseStarsStarIdResponse>(`/universe/stars/${id}`);
}

export function useStar(id: number) {
  return useQuery({
    queryKey: ["star", id],
    queryFn: () => getStar(id),
  });
}

export function useStars(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["stars", id],
            queryFn: () => getStar(id),
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
