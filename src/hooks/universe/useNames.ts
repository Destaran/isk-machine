import { useQuery } from "@tanstack/react-query";
import { postUniverseNames, PostUniverseNamesData } from "../../hey-api";

export function useNames(ids: number[]) {
  const options: PostUniverseNamesData = {
    path: { ids },
  };

  return useQuery({
    queryKey: ["names", ids],
    queryFn: () => postUniverseNames(options),
  });
}
