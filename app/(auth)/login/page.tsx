import { Receipt, Triangle } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/features/auth/login-form";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
  const t = await getTranslations("Navigation");

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-xl bg-background/10 p-2 backdrop-blur-xs">
        <Button asChild className="gap-2" size="sm" variant="ghost">
          <Link href="/receipt">
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">{t("checkReceipt")}</span>
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

      <div className="z-10 flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Triangle className="text-white" />
          </div>
          <span className="font-semibold text-foreground text-lg tracking-tight">
            Beringin Coin Laundry
          </span>
        </div>

        <div className="w-full rounded-2xl bg-background/60 p-8 shadow-black/5 shadow-xl backdrop-blur-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
