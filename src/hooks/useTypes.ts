import { useQueries, useQuery } from "@tanstack/react-query";
import { get } from "../API/API";
import {
  GetUniverseTypesResponse,
  GetUniverseTypesTypeIdResponse,
} from "../hey-api";

async function getTypes() {
  return await get<GetUniverseTypesResponse>("/universe/types");
}

async function getType(id: number) {
  return await get<GetUniverseTypesTypeIdResponse>(`/universe/types/${id}`);
}

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
