"use client";

import { Receipt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LoginForm } from "@/components/features/auth/login-form";
import { VoucherShowcase } from "@/components/features/auth/voucher-showcase";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";
import { Button } from "@/components/ui/button";
import LoginBackground from "@/public/laundry-login-bg.jpg";

export default function LoginPage() {
  const t = useTranslations("Navigation");
  const tp = useTranslations("LoginPage");

  return (
    <div className="relative min-h-screen">
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
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* LEFT: Sign in */}
        <section className="relative flex flex-col justify-center overflow-hidden px-8 py-16 md:px-20">
          {/* Background photo */}
          <Image
            alt=""
            className="object-cover"
            fill
            priority
            src={LoginBackground}
          />
          {/* Dark overlay for text contrast */}
          <div aria-hidden="true" className="absolute inset-0 bg-black/75" />

          <div className="relative z-10">
            <div className="mb-16 flex items-center gap-2.5">
              <span className="font-semibold text-[13px] text-white uppercase tracking-wide">
                Beringin Coin Laundry
              </span>
            </div>

            <h1 className="mb-3 font-semibold text-4xl text-white leading-tight tracking-tight">
              {tp("heroTitle")}
            </h1>
            <p className="mb-12 text-[15px] text-white/75 leading-relaxed">
              {tp("heroDescription")}
            </p>

            <LoginForm />
          </div>
        </section>

        {/* RIGHT: Vouchers */}
        <section className="relative flex flex-col items-center justify-center border-border border-t px-8 py-16 md:border-t-0 md:border-l md:px-20">
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

          <h2 className="mb-10 font-semibold text-2xl text-foreground leading-snug">
            {tp("availableVouchers")}
          </h2>

          <div className="max-w-sm">
            <VoucherShowcase />
          </div>
        </section>
      </div>
    </div>
  );
}
