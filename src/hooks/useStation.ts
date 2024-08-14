import { useQuery } from "@tanstack/react-query";
import {
  getUniverseStationsStationId,
  GetUniverseStationsStationIdData,
} from "../hey-api";

export function useStation(id: number) {
  const options: GetUniverseStationsStationIdData = {
    path: { station_id: id },
  };

  return useQuery({
    queryKey: ["station", id],
    queryFn: () => getUniverseStationsStationId(options),
  });
}
