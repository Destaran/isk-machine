import { useQuery } from '@tanstack/react-query';
import { get } from '../API';
import { useCallback } from 'react';
import { SearchResult } from './SearchResult';

async function getTypes(searchTerm: string) {
  return await get<SearchResult[]>(`/market/search?s=${searchTerm}`);
}

export function useSearch(searchTerm: string, enabled: boolean) {
  const getCurrentOrders = useCallback(
    async () => await getTypes(searchTerm),
    [searchTerm]
  );
  return useQuery({
    queryKey: ['search', searchTerm],
    queryFn: getCurrentOrders,
    enabled,
  });
}
