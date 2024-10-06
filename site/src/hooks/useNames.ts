import { useQuery } from '@tanstack/react-query';
import { postUniverseNames } from '../hey-api';

export function useNames(ids: number[]) {
  const options = {
    body: ids,
  };

  return useQuery({
    queryKey: ['names', ids],
    staleTime: Infinity,
    queryFn: () => postUniverseNames(options),
    select: (response) => response.data,
  });
}
