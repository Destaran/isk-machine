import { useQuery } from '@tanstack/react-query';
import {
  getUniverseTypesTypeId,
  GetUniverseTypesTypeIdData,
} from '../../hey-api';

export function useTypeSelected(id: number, enabled: boolean) {
  const options: GetUniverseTypesTypeIdData = {
    path: { type_id: id },
  };

  return useQuery({
    queryKey: ['type', id],
    enabled,
    queryFn: () => getUniverseTypesTypeId(options),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
