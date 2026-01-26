"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { queryClient } from "@/lib/query-client";

interface TanstackProviderProps {
  children: React.ReactNode;
}

export const TanstackProvider = ({ children }: TanstackProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
