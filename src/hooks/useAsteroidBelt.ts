import { useQuery } from "@tanstack/react-query";
import {
  getUniverseAsteroidBeltsAsteroidBeltId,
  GetUniverseAsteroidBeltsAsteroidBeltIdData,
} from "../hey-api";

export function useAsteroidBelt(id: number) {
  const options: GetUniverseAsteroidBeltsAsteroidBeltIdData = {
    path: { asteroid_belt_id: id },
  };
  return useQuery({
    queryKey: ["asteroid_belt", id],
    queryFn: () => getUniverseAsteroidBeltsAsteroidBeltId(options),
  });
}
