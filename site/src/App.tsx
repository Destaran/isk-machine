import { BrowserRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AppRoutes } from './AppRoutes';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

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
    <BrowserRouter>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Provider store={store}>
          <PageWrapper>
            <AppRoutes />
          </PageWrapper>
        </Provider>
      </PersistQueryClientProvider>
    </BrowserRouter>
  );
}
