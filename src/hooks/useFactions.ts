import { useQuery } from "@tanstack/react-query";
import { getFactions } from "../API/universe";

export function useAllFactions() {
  return useQuery({
    queryKey: ["factions"],
    queryFn: getFactions,
  });
}
