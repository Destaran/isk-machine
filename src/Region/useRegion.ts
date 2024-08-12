import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "../API";
import { Region } from "../types";

async function getRegion(id: number) {
  if (!id) {
    throw new Error("Region id is required");
  }
  return await get<Region>(`/universe/regions/${id}`);
}

export function useRegion(id: number) {
  const getCurrentRegion = useCallback(async () => await getRegion(id), [id]);

  return useQuery({ queryKey: ["region", id], queryFn: getCurrentRegion });
}
