import { useQueries, useQuery } from "@tanstack/react-query";
import { get } from "../API/API";
import { GetUniversePlanetsPlanetIdResponse } from "../hey-api";

async function getPlanet(id: number) {
  return await get<GetUniversePlanetsPlanetIdResponse>(
    `/universe/planets/${id}`
  );
}

export function usePlanet(id: number) {
  return useQuery({
    queryKey: ["planet", id],
    queryFn: () => getPlanet(id),
  });
}

export function usePlanets(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["planets", id],
            queryFn: () => getPlanet(id),
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
