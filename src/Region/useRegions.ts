import { get } from "../API";
import { useQuery } from "@tanstack/react-query";

async function getRegions() {
  return await get<number[]>("/universe/regions");
}

export function useRegions() {
  return useQuery({ queryKey: ["regions"], queryFn: getRegions });
}
