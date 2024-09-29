import { useQuery } from "@tanstack/react-query";
import {
  getUniverseConstellationsConstellationId,
  GetUniverseConstellationsConstellationIdData,
} from "../../hey-api";

export function useConstellation(id: number) {
  const options: GetUniverseConstellationsConstellationIdData = {
    path: { constellation_id: id },
  };

  return useQuery({
    queryKey: ["constellation", id],
    queryFn: () => getUniverseConstellationsConstellationId(options),
  });
}
