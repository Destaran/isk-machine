import { useQuery } from "@tanstack/react-query";
import {
  getUniverseRegionsRegionId,
  GetUniverseRegionsRegionIdData,
} from "../../hey-api";

export function useRegion(id: number) {
  const options: GetUniverseRegionsRegionIdData = {
    path: { region_id: id },
  };

  return useQuery({
    queryKey: ["region", id],
    queryFn: () => getUniverseRegionsRegionId(options),
  });
}
