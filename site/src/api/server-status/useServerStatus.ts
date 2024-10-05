import { useQuery } from '@tanstack/react-query';
import { get } from '../API';
import { ServerStatus } from './ServerStatus';
import { useCallback } from 'react';

async function getServerStatus() {
  return await get<ServerStatus>('/server-status');
}

export function useServerStatus() {
  const getCurrentServerStatus = useCallback(
    async () => await getServerStatus(),
    []
  );
  return useQuery({
    queryKey: ['server-status'],
    queryFn: getCurrentServerStatus,
    refetchInterval: 5 * 60 * 1000,
  });
}
