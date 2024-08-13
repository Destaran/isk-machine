import { useQuery } from "@tanstack/react-query";
import { getFactions } from "../API/Universe";

export function useAllFactions() {
  return useQuery({
    queryKey: ["factions"],
    queryFn: getFactions,
  });
}
