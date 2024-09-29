import { useQuery } from '@tanstack/react-query';
import { get } from '../API';
import { Order } from './Order';
import { useCallback } from 'react';

async function getOrders(typeId: number) {
  return await get<Order[]>(`/market/orders/${typeId}`);
}

export function useOrders(typeId: number, enabled: boolean) {
  const getCurrentOrders = useCallback(
    async () => await getOrders(typeId),
    [typeId]
  );
  return useQuery({
    queryKey: ['orders', typeId],
    queryFn: getCurrentOrders,
    enabled,
  });
}
