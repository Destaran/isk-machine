import { useQuery } from "@tanstack/react-query";
import {
  getUniverseSystemsSystemId,
  GetUniverseSystemsSystemIdData,
} from "../hey-api";

export function useSystem(id: number) {
  const options: GetUniverseSystemsSystemIdData = {
    path: { system_id: id },
  };

  return useQuery({
    queryKey: ["system", id],
    queryFn: () => getUniverseSystemsSystemId(options),
  });
}
