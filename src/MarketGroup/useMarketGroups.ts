import { get } from "../API";
import { useQuery } from "@tanstack/react-query";

async function getMarketGroups() {
  return await get<number[]>("/markets/groups");
}

export function useMarketGroups() {
  return useQuery({ queryKey: ["marketGroups"], queryFn: getMarketGroups });
}
