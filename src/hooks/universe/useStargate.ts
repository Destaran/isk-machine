import { useQuery } from "@tanstack/react-query";
import {
  getUniverseStargatesStargateId,
  GetUniverseStargatesStargateIdData,
} from "../../hey-api";

export function useStargate(id: number) {
  const options: GetUniverseStargatesStargateIdData = {
    path: { stargate_id: id },
  };

  return useQuery({
    queryKey: ["stargate", id],
    queryFn: () => getUniverseStargatesStargateId(options),
  });
}
