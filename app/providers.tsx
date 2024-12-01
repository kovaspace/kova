"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DialogProvider } from "@/context/dialogContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <SidebarProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </SidebarProvider>
      </DialogProvider>
    </QueryClientProvider>
  );
};

export default Providers;
