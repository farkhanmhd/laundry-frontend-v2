import { Triangle, Receipt } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/features/auth/login-form";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";

export default async function LoginPage() {
  const t = await getTranslations("Navigation");

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link href="/receipt">
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">{t("checkReceipt")}</span>
          </Link>
        </Button>
        <TranslatorToggle />
        <ThemeToggle />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="z-10 flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Triangle className="text-white" />
          </div>
          <span className="font-semibold text-foreground text-lg tracking-tight">
            Beringin Coin Laundry
          </span>
        </div>

        <div className="w-full rounded-2xl border bg-background/60 p-8 shadow-black/5 shadow-xl backdrop-blur-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
