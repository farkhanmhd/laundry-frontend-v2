import { LogIn } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
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
import { Back } from "@/components/navigation/back-button";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { TranslatorToggle } from "@/components/providers/translator";
import { Button } from "@/components/ui/button";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id: orderId } = await params;
  const t = await getTranslations("Navigation");

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background">
      {/* Top bar */}
      <div className="absolute top-4 right-4 left-4 z-10 flex items-center justify-between gap-2">
        <Back />
        <div className="flex items-center gap-2">
          <Button asChild className="gap-2" size="sm" variant="ghost">
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">{t("login")}</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <TranslatorToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto mt-12 w-full max-w-xl px-4 pb-6">
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
        <div className="mb-3 flex flex-col gap-1">
          <h1 className="font-semibold text-[22px] text-foreground tracking-tight">
            Order Detail
          </h1>
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
