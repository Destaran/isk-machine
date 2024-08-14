import { useQuery } from "@tanstack/react-query";
import { getUniverseGroups } from "../../hey-api";

export function useGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: getUniverseGroups,
  });
}
