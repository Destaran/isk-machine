import { get } from "../API";
import { useQuery } from "@tanstack/react-query";

async function getItemTypes() {
  return await get<number[]>("/universe/types");
}

export function useItemTypes() {
  return useQuery({ queryKey: ["types"], queryFn: getItemTypes });
}
