import { useQuery } from "@tanstack/react-query";
import {
  getMarketsRegionIdTypes,
  GetMarketsRegionIdTypesData,
} from "../../hey-api";

export function useMarketRegionTypes(id: number) {
  const options: GetMarketsRegionIdTypesData = {
    path: { region_id: id },
  };

  return useQuery({
    queryKey: ["marketRegionTypes", id],
    queryFn: () => getMarketsRegionIdTypes(options),
  });
}
