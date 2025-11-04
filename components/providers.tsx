import { Toaster } from "@/components/ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <Toaster />
  </>
);
