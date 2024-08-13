import { useQueries, useQuery } from "@tanstack/react-query";
import { get } from "../API/API";
import {
  GetUniverseRegionsRegionIdResponse,
  GetUniverseRegionsResponse,
} from "../hey-api";

async function getRegions() {
  return await get<GetUniverseRegionsResponse>("/universe/regions");
}

async function getRegion(id: number) {
  return await get<GetUniverseRegionsRegionIdResponse>(
    `/universe/regions/${id}`
  );
}

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
