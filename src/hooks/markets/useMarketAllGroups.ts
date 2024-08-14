import { useQuery } from "@tanstack/react-query";
import { getMarketsGroups } from "../../hey-api";

export function useMarketAllGroups() {
  return useQuery({
    queryKey: ["marketGroups"],
    queryFn: getMarketsGroups,
  });
}
