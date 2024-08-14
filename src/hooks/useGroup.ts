import { useQuery } from "@tanstack/react-query";
import {
  getUniverseGroupsGroupId,
  GetUniverseGroupsGroupIdData,
} from "../hey-api";

export function useGroup(id: number) {
  const options: GetUniverseGroupsGroupIdData = {
    path: { group_id: id },
  };

  return useQuery({
    queryKey: ["group", id],
    queryFn: () => getUniverseGroupsGroupId(options),
  });
}
