import { useQueries, useQuery } from "@tanstack/react-query";
import { getStation } from "../API/universe";

export function useStation(id: number) {
  return useQuery({
    queryKey: ["station", id],
    queryFn: () => getStation(id),
  });
}

export function useStations(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["stations", id],
            queryFn: () => getStation(id),
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
