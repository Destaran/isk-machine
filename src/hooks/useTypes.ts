import { useQueries, useQuery } from "@tanstack/react-query";
import { getType, getTypes } from "../API/universe";

export function useType(id: number) {
  return useQuery({
    queryKey: ["type", id],
    queryFn: () => getType(id),
  });
}

export function useTypes(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["types", id],
            queryFn: () => getType(id),
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

export function useAllTypes() {
  const { data: itemTypeIds } = useQuery({
    queryKey: ["types"],
    queryFn: getTypes,
  });

  return useTypes(itemTypeIds ?? []);
}
