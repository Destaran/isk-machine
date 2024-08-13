import { useQueries, useQuery } from "@tanstack/react-query";
import { getMoon } from "../API/universe";

export function useMoon(id: number) {
  return useQuery({
    queryKey: ["moon", id],
    queryFn: () => getMoon(id),
  });
}

export function useMoons(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["moons", id],
            queryFn: () => getMoon(id),
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
