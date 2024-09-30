import { useQuery } from '@tanstack/react-query';
import { get } from '../API';
import { MarketData } from './MarketData';
import { useCallback } from 'react';

async function getData(typeId: number) {
  return await get<MarketData>(`/market/orders/${typeId}`);
}

export function useData(typeId: number, enabled: boolean) {
  const getCurrentOrders = useCallback(
    async () => await getData(typeId),
    [typeId]
  );
  return useQuery({
    queryKey: ['orders', typeId],
    queryFn: getCurrentOrders,
    enabled,
  });
}
