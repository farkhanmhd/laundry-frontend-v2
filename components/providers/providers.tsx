import { Provider as JotaiProvider } from "jotai";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { TanstackProvider } from "./tanstack-provider";
import { ThemeProvider } from "./theme-provider";

export const Providers = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <NuqsAdapter>
      <TanstackProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <JotaiProvider>
              {children}
              <Toaster />
            </JotaiProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </TanstackProvider>
    </NuqsAdapter>
  );
};
