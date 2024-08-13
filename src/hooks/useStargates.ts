import { useQueries, useQuery } from "@tanstack/react-query";
import { getStargate } from "../API/Universe";

export function useStargate(id: number) {
  return useQuery({
    queryKey: ["stargate", id],
    queryFn: () => getStargate(id),
  });
}

export function useStargates(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["stargates", id],
            queryFn: () => getStargate(id),
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
