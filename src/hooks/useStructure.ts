import { useQuery } from "@tanstack/react-query";
import {
  getUniverseStructuresStructureId,
  GetUniverseStructuresStructureIdData,
} from "../hey-api";

export function useStructure(id: number) {
  const options: GetUniverseStructuresStructureIdData = {
    path: { structure_id: id },
  };

  return useQuery({
    queryKey: ["structure", id],
    queryFn: () => getUniverseStructuresStructureId(options),
  });
}
