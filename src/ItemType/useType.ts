import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "../API";
import { ItemType } from "../types";

async function getItemType(id: number) {
  if (!id) {
    throw new Error("Type id is required");
  }
  return await get<ItemType>(`/universe/types/${id}`);
}

export function useItemType(id: number) {
  const getCurrentItemType = useCallback(
    async () => await getItemType(id),
    [id]
  );

  return useQuery({ queryKey: ["type", id], queryFn: getCurrentItemType });
}
