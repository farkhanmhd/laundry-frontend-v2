import { LogIn } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ReceiptSearch } from "@/components/features/receipt/receipt-search";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";

export default async function ReceiptSearchPage() {
  const t = await getTranslations("Navigation");

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-background">
      {/* Background geometry */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Top bar */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link href="/login">
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">{t("login")}</span>
          </Link>
        </Button>
        <TranslatorToggle />
        <ThemeToggle />
      </div>

      {/* Center layout */}
      <div className="flex min-h-svh flex-col items-center justify-center px-4 py-16">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <div className="h-3 w-3 rounded-sm bg-primary-foreground" />
            </div>
            <span className="font-semibold text-base text-foreground/80 tracking-tight">
              Beringin Coin Laundry
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="w-full max-w-95 rounded-2xl border border-border/60 bg-card/80 p-8 shadow-black/5 shadow-xl ring-1 ring-white/5 ring-inset backdrop-blur-sm">
          <ReceiptSearch />
        </div>
      </div>
    </div>
  );
}
