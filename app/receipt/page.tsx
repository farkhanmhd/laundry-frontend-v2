import { LogIn, Triangle } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ReceiptSearch } from "@/components/features/receipt/receipt-search";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";
import { Button } from "@/components/ui/button";

export default async function ReceiptSearchPage() {
  const t = await getTranslations("Navigation");

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-background/10 p-2 backdrop-blur-xs">
        <Button asChild className="gap-2" size="sm" variant="ghost">
          <Link href="/login">
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">{t("login")}</span>
          </Link>
        </Button>
        <TranslatorToggle />
        <ThemeToggle />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/login-bg.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Center layout */}
      <div className="flex min-h-svh flex-col items-center justify-center px-4 py-16">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Triangle className="text-white" />
          </div>
          <span className="font-semibold text-foreground text-lg tracking-tight">
            Beringin Coin Laundry
          </span>
        </div>

        {/* Card */}
        <div className="w-full max-w-95 rounded-2xl border border-border/60 bg-card/80 p-8 shadow-black/5 shadow-xl ring-1 ring-white/5 ring-inset backdrop-blur-sm">
          <ReceiptSearch />
        </div>
      </div>
    </div>
  );
}
