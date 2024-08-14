import { useQuery } from "@tanstack/react-query";
import {
  getUniverseStarsStarId,
  GetUniverseStarsStarIdData,
} from "../../hey-api";

export function useStar(id: number) {
  const options: GetUniverseStarsStarIdData = {
    path: { star_id: id },
  };

  return useQuery({
    queryKey: ["star", id],
    queryFn: () => getUniverseStarsStarId(options),
  });
}
