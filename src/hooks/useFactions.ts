import { useQuery } from "@tanstack/react-query";
import { getUniverseFactions } from "../hey-api";

export function useAllFactions() {
  return useQuery({
    queryKey: ["factions"],
    queryFn: getUniverseFactions,
  });
}
