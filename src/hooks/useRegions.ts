import { useQueries, useQuery } from "@tanstack/react-query";
import { getRegion, getRegions } from "../API/universe";

export function useRegion(id: number) {
  return useQuery({
    queryKey: ["region", id],
    queryFn: () => getRegion(id),
  });
}

export function useRegions(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["regions", id],
            queryFn: () => getRegion(id),
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

export function useAllRegions() {
  const { data: regionIds } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  return useRegions(regionIds ?? []);
}
