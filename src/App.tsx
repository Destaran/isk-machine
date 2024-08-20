import { QueryClient } from "@tanstack/react-query";
import { Market } from "./Market/Market";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 3000,
      retry: 3,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Market />
    </PersistQueryClientProvider>
  );
}
