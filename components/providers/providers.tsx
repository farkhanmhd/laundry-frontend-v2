import { Provider as JotaiProvider } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NuqsAdapter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <JotaiProvider>
        {children}
        <Toaster />
      </JotaiProvider>
    </ThemeProvider>
  </NuqsAdapter>
);
