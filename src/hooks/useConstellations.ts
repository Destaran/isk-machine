import { useQueries, useQuery } from "@tanstack/react-query";
import { getConstellation, getConstellations } from "../API/universe";

export function useConstellation(id: number) {
  return useQuery({
    queryKey: ["constellation", id],
    queryFn: () => getConstellation(id),
  });
}

export function useConstellations(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["constellations", id],
            queryFn: () => getConstellation(id),
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

export function useAllConstellations() {
  const { data: constellationIds } = useQuery({
    queryKey: ["constellations"],
    queryFn: getConstellations,
  });

  return useConstellations(constellationIds ?? []);
}
