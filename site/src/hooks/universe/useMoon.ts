import { useQuery } from "@tanstack/react-query";
import {
  getUniverseMoonsMoonId,
  GetUniverseMoonsMoonIdData,
} from "../../hey-api";

export function useMoon(id: number) {
  const options: GetUniverseMoonsMoonIdData = {
    path: { moon_id: id },
  };

  return useQuery({
    queryKey: ["moon", id],
    queryFn: () => getUniverseMoonsMoonId(options),
  });
}
