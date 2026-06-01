import { LogIn, Triangle } from "lucide-react";
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
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-4 right-4 left-4 z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-background/10 p-2 backdrop-blur-xs">
          <Back />
        </div>
        <div className="flex items-center gap-2 bg-background/10 p-2 backdrop-blur-xs">
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

      {/* Content */}
      <div className="mx-auto mt-12 w-full max-w-xl px-4 pb-6">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Triangle className="text-white" />
          </div>
          <span className="font-semibold text-foreground text-lg tracking-tight">
            Beringin Coin Laundry
          </span>
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
