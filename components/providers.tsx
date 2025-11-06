import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NuqsAdapter>
    {children}
    <Toaster />
  </NuqsAdapter>
);
