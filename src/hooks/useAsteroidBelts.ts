import { useQueries, useQuery } from "@tanstack/react-query";
import { getAsteroidBelt } from "../API/Universe";

export function useAsteroidBelt(id: number) {
  return useQuery({
    queryKey: ["asteroid_belt", id],
    queryFn: () => getAsteroidBelt(id),
  });
}

export function useAsteroidBelts(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["asteroid_belts", id],
            queryFn: () => getAsteroidBelt(id),
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
