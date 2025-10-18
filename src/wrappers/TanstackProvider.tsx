'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5 // 5 minutes before staletime
        }
    }
});

function TanstackProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            { children }
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default TanstackProvider