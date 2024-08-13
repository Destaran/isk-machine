import { useQueries, useQuery } from "@tanstack/react-query";
import { getCategory, getCategories } from "../API/universe";

export function useCategory(id: number) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
  });
}

export function useCategories(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["categories", id],
            queryFn: () => getCategory(id),
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

export function useAllCategories() {
  const { data: categoryIds } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return useCategories(categoryIds ?? []);
}
