import { useQueries, useQuery } from "@tanstack/react-query";
import { get } from "../API/API";
import {
  GetUniverseSystemsResponse,
  GetUniverseSystemsSystemIdResponse,
} from "../hey-api";

async function getSystems() {
  return await get<GetUniverseSystemsResponse>("/universe/systems");
}

async function getSystem(id: number) {
  return await get<GetUniverseSystemsSystemIdResponse>(
    `/universe/systems/${id}`
  );
}

export function useSystem(id: number) {
  return useQuery({
    queryKey: ["system", id],
    queryFn: () => getSystem(id),
  });
}

export function useSystems(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["systems", id],
            queryFn: () => getSystem(id),
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

export function useAllSystems() {
  const { data: systemIds } = useQuery({
    queryKey: ["systems"],
    queryFn: getSystems,
  });

  return useSystems(systemIds ?? []);
}
