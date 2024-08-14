import { useQuery } from "@tanstack/react-query";
import {
  getUniversePlanetsPlanetId,
  GetUniversePlanetsPlanetIdData,
} from "../hey-api";

export function usePlanet(id: number) {
  const options: GetUniversePlanetsPlanetIdData = {
    path: { planet_id: id },
  };

  return useQuery({
    queryKey: ["planet", id],
    queryFn: () => getUniversePlanetsPlanetId(options),
  });
}
