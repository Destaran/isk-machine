import { useQueries, useQuery } from "@tanstack/react-query";
import { getStructure, getStructures } from "../API/Universe";

export function useStructure(id: number) {
  return useQuery({
    queryKey: ["structure", id],
    queryFn: () => getStructure(id),
  });
}

export function useStructures(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["structures", id],
            queryFn: () => getStructure(id),
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

export function useAllStructures() {
  const { data: structureIds } = useQuery({
    queryKey: ["structures"],
    queryFn: getStructures,
  });

  return useStructures(structureIds ?? []);
}
