import { useQuery } from "@tanstack/react-query";
import { postUniverseNames } from "../../hey-api";

export function useNames(ids: number[]) {
  const options = {
    body: ids,
  };

  return useQuery({
    queryKey: ["names", ids],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: () => postUniverseNames(options),
  });
}
