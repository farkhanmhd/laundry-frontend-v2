// app/register/page.tsx

import { RegisterForm } from "@/components/features/auth/register-form";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";

export default function RegisterPage() {
  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-background">
      {/* Top bar controls */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
        <TranslatorToggle />
        <ThemeToggle />
      </div>

      {/* Decorative background geometry — same as login */}
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

      {/* Center layout */}
      <div className="flex min-h-svh flex-col items-center justify-center px-4 py-16">
        {/* Brand mark */}
        <div className="mb-8 flex items-center gap-2.5">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <div className="h-3 w-3 rounded-sm bg-primary-foreground" />
            </div>
            <span className="font-semibold text-base text-foreground/80 tracking-tight">
              Beringin Coin Laundry
            </span>
          </div>
        </div>

        {/* Card — slightly wider than login to fit the form comfortably */}
        <div className="w-full max-w-105 rounded-2xl border border-border/60 bg-card/80 p-8 shadow-black/5 shadow-xl ring-1 ring-white/5 ring-inset backdrop-blur-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
