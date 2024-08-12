import { JitaFlip } from "./JitaFlip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      retry: 3,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JitaFlip />
    </QueryClientProvider>
  );
}
