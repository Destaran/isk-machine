import { useQueries, useQuery } from "@tanstack/react-query";
import { get } from "../API/API";
import { GetUniverseMoonsMoonIdResponse } from "../hey-api";

async function getMoon(id: number) {
  return await get<GetUniverseMoonsMoonIdResponse>(`/universe/moons/${id}`);
}

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
