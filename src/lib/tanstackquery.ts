import { QueryClient } from "@tanstack/react-query";

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60, // 60 دقائق
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
