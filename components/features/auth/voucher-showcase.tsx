"use client";

import { useQuery } from "@tanstack/react-query";
import { differenceInCalendarDays } from "date-fns";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { elysia } from "@/elysia";
import { cn, formatDate } from "@/lib/utils";

/**
 * Stand-in for a real API/server-action call. Replace the body with, e.g.
 * `const res = await fetch("/api/vouchers"); return res.json();` once the
 * endpoint exists — the return type already matches `useActiveVouchers`.
 */
export async function fetchActiveVouchers() {
  const { data } = await elysia.vouchers.visible.get();

  return data?.data.vouchers;
}

export function useActiveVouchers() {
  return useQuery({
    queryKey: ["vouchers", "active"],
    queryFn: fetchActiveVouchers,
    // Surface the error immediately instead of retrying silently —
    // the UI has its own manual "retry" button.
    retry: false,
  });
}

const ROTATE_INTERVAL_MS = 4500;

export type Voucher = {
  code: string;
  description: string;
  discountPercentage: string | null; // numeric column -> string from the driver
  discountAmount: number | null; // bigint, mode: "number"
  minSpend: number;
  maxDiscountAmount: number;
  expiresAt: string | null;
};

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDiscountValue(voucher: Voucher) {
  if (voucher.discountPercentage) {
    return `${Number.parseFloat(voucher.discountPercentage)}%`;
  }
  if (voucher.discountAmount) {
    return formatRupiah(voucher.discountAmount);
  }
  return "-";
}

function formatExpiry(expiresAt: string | null, t: (key: string, params?: Record<string, string | number>) => string) {
  if (!expiresAt) {
    return t("noExpiry");
  }
  const daysLeft = differenceInCalendarDays(new Date(expiresAt), new Date());
  if (daysLeft <= 0) {
    return t("expiresToday");
  }
  if (daysLeft <= 7) {
    return t("expiresInDays", { days: daysLeft });
  }
  return formatDate(expiresAt);
}

function VoucherShowcaseSkeleton() {
  return (
    <div>
      <Skeleton className="mb-2 h-11 w-28" />
      <Skeleton className="mb-1.5 h-4 w-full" />
      <Skeleton className="mb-6 h-4 w-2/3" />
      <div className="flex items-baseline gap-3 border-border border-t pt-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="mt-8 flex gap-1.5">
        <Skeleton className="h-1 w-6 rounded-full" />
        <Skeleton className="h-1 w-3 rounded-full" />
        <Skeleton className="h-1 w-3 rounded-full" />
        <Skeleton className="h-1 w-3 rounded-full" />
      </div>
    </div>
  );
}

function VoucherShowcaseError({
  isRetrying,
  message,
  onRetry,
}: {
  isRetrying: boolean;
  message: string;
  onRetry: () => void;
}) {
  const t = useTranslations("LoginPage");
  return (
    <div className="rounded-lg border border-border px-5 py-6">
      <div className="mb-2 flex items-center gap-2 text-destructive">
        <AlertCircle className="h-4 w-4" />
        <p className="font-semibold text-sm">{t("voucherErrorTitle")}</p>
      </div>
      <p className="mb-4 text-[13px] text-muted-foreground">{message}</p>
      <Button
        className="gap-2"
        disabled={isRetrying}
        onClick={onRetry}
        size="sm"
        variant="outline"
      >
        <RefreshCw
          className={cn("h-3.5 w-3.5", isRetrying && "animate-spin")}
        />
        {isRetrying ? t("voucherRetrying") : t("voucherRetry")}
      </Button>
    </div>
  );
}

function VoucherShowcaseEmpty() {
  const t = useTranslations("LoginPage");
  return (
    <p className="rounded-lg border border-border border-dashed px-6 py-10 text-center text-muted-foreground text-sm">
      {t("noActiveVouchers")}
    </p>
  );
}

export function VoucherShowcase() {
  const t = useTranslations("LoginPage");
  const [index, setIndex] = useState(0);
  const {
    data: vouchers,
    error,
    isFetching,
    isPending,
    isError,
    refetch,
  } = useActiveVouchers();

  useEffect(() => {
    if (!vouchers || vouchers.length <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % vouchers.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [vouchers]);

  if (isPending) {
    return <VoucherShowcaseSkeleton />;
  }

  if (!vouchers || isError) {
    return (
      <VoucherShowcaseError
        isRetrying={isFetching}
        message={error instanceof Error ? error.message : t("voucherErrorGeneric")}
        onRetry={() => refetch()}
      />
    );
  }

  if (vouchers.length === 0) {
    return <VoucherShowcaseEmpty />;
  }

  const voucher = vouchers[Math.min(index, vouchers.length - 1)];

  return (
    <div>
      <div
        className="fade-in slide-in-from-bottom-1 animate-in duration-700"
        key={voucher.code}
      >
        <p className="mb-2 font-semibold text-5xl text-foreground">
          {formatDiscountValue(voucher)}
        </p>
        <p className="mb-1.5 text-[15px] text-foreground">
          {voucher.description}
        </p>
        <p className="mb-6 text-[13px] text-muted-foreground">
          {t("minSpend")} {formatRupiah(voucher.minSpend)}
          {voucher.discountPercentage
            ? ` · ${t("maxDiscount")} ${formatRupiah(voucher.maxDiscountAmount)}`
            : null}
        </p>
        <div className="flex items-baseline gap-3 border-border border-t pt-4">
          <span className="font-mono text-[12.5px] text-foreground uppercase">
            {voucher.code}
          </span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
            {formatExpiry(voucher.expiresAt, t)}
          </span>
        </div>
      </div>

      {vouchers.length > 1 && (
        <div className="mt-8 flex gap-1.5">
          {vouchers.map((v, i) => (
            <button
              aria-current={i === index}
              aria-label={t("viewVoucher", { code: v.code })}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-primary"
                  : "w-3 bg-border hover:bg-muted-foreground/50"
              )}
              key={v.code}
              onClick={() => setIndex(i)}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}
