import { LogIn } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  CustomerSection,
  DeliveriesSection,
  ItemsSection,
  OrderInfoSection,
  PaymentSection,
} from "@/components/features/receipt/order-sections";
import {
  CustomerSkeleton,
  DeliveriesSkeleton,
  InfoSkeleton,
  ItemsSkeleton,
  PaymentSkeleton,
} from "@/components/features/receipt/order-ui";
import { SectionErrorBoundary } from "@/components/features/receipt/section-error-boundary";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id: orderId } = await params;
  const t = await getTranslations("Navigation");

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-background">
      {/* Background geometry — same as auth pages */}
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

      {/* Content */}
      <div className="mx-auto w-full max-w-xl px-4 py-14">
        {/* Brand */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <div className="h-3 w-3 rounded-sm bg-primary-foreground" />
            </div>
            <span className="font-semibold text-base text-foreground/80 tracking-tight">
              Beringin Coin Laundry
            </span>
          </div>
        </div>

        {/* Page heading */}
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="font-semibold text-[22px] text-foreground tracking-tight">
            Order Detail
          </h1>
          <p className="font-mono text-[12.5px] text-muted-foreground uppercase">
            {orderId}
          </p>
        </div>

        {/* Sections — all siblings, fetches run in parallel */}
        <div className="flex flex-col gap-3">
          <SectionErrorBoundary fallback={<InfoSkeleton />}>
            <OrderInfoSection orderId={orderId} />
          </SectionErrorBoundary>

          <SectionErrorBoundary fallback={<CustomerSkeleton />}>
            <CustomerSection orderId={orderId} />
          </SectionErrorBoundary>

          <SectionErrorBoundary fallback={<DeliveriesSkeleton />}>
            <DeliveriesSection orderId={orderId} />
          </SectionErrorBoundary>

          <SectionErrorBoundary fallback={<PaymentSkeleton />}>
            <PaymentSection orderId={orderId} />
          </SectionErrorBoundary>

          <SectionErrorBoundary fallback={<ItemsSkeleton />}>
            <ItemsSection orderId={orderId} />
          </SectionErrorBoundary>
        </div>
      </div>
    </div>
  );
}
