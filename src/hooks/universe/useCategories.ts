import { useQuery } from "@tanstack/react-query";
import { getUniverseCategories } from "../../hey-api";

export function useCategories() {
  return useQuery({
    queryKey: ["category"],
    queryFn: getUniverseCategories,
  });
}
