import { useQuery } from "@tanstack/react-query";
import { getUniverseTypesTypeId, GetUniverseTypesTypeIdData } from "../hey-api";

export function useType(id: number) {
  const options: GetUniverseTypesTypeIdData = {
    path: { type_id: id },
  };

  return useQuery({
    queryKey: ["type", id],
    queryFn: () => getUniverseTypesTypeId(options),
  });
}
