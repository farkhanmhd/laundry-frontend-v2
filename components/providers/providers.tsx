import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NuqsAdapter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </ThemeProvider>
  </NuqsAdapter>
);
