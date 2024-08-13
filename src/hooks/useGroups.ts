import { useQueries, useQuery } from "@tanstack/react-query";
import { get } from "../API/API";
import {
  GetUniverseGroupsResponse,
  GetUniverseGroupsGroupIdResponse,
} from "../hey-api";

async function getGroups() {
  return await get<GetUniverseGroupsResponse>("/universe/groups");
}

async function getGroup(id: number) {
  return await get<GetUniverseGroupsGroupIdResponse>(`/universe/groups/${id}`);
}

export function useGroup(id: number) {
  return useQuery({
    queryKey: ["group", id],
    queryFn: () => getGroup(id),
  });
}

export function useGroups(ids: number[]) {
  return useQueries({
    queries: ids
      ? ids.map((id) => {
          return {
            queryKey: ["groups", id],
            queryFn: () => getGroup(id),
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

export function useAllGroups() {
  const { data: groupIds } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  return useGroups(groupIds ?? []);
}
