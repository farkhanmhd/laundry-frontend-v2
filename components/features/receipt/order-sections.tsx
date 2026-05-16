// components/features/receipt/order-sections.tsx
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { BadgeCheck, Clock, CreditCard, Package, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReceiptApi } from "@/lib/modules/receipt/data";
import { cn } from "@/lib/utils";
import { SectionCard, SectionHeading } from "./order-ui";

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------
export function useOrderInfo(orderId: string) {
  return useSuspenseQuery({
    queryKey: ["order-info", orderId],
    queryFn: () => ReceiptApi.fetchOrderInfo(orderId),
  });
}

export function useOrderCustomer(orderId: string) {
  return useSuspenseQuery({
    queryKey: ["order-customer", orderId],
    queryFn: () => ReceiptApi.fetchOrderCustomer(orderId),
  });
}

export function useOrderDeliveries(orderId: string) {
  return useSuspenseQuery({
    queryKey: ["order-deliveries", orderId],
    queryFn: () => ReceiptApi.fetchOrderDeliveries(orderId),
  });
}

export function useOrderPayment(orderId: string) {
  return useSuspenseQuery({
    queryKey: ["order-payment", orderId],
    queryFn: () => ReceiptApi.fetchOrderPayment(orderId),
  });
}

export function useOrderItems(orderId: string) {
  return useSuspenseQuery({
    queryKey: ["order-items", orderId],
    queryFn: () => ReceiptApi.fetchOrderItems(orderId),
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Math.abs(amount));
}

function formatDate(raw: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(raw));
}

const STATUS_CLASSES: Record<string, string> = {
  pending: "bg-muted/60 text-muted-foreground border-border",
  processing:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  washing: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  drying: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  ironing:
    "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  ready: "bg-primary/10 text-primary border-primary/20",
  delivering:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  picked_up:
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  completed:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations("Status");
  const className = STATUS_CLASSES[status] ?? STATUS_CLASSES.pending;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium text-[11.5px]",
        className
      )}
    >
      {t(status)}
    </span>
  );
}

const PAYMENT_STATUS_CLASSES: Record<string, string> = {
  settlement:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  pending:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  deny: "bg-destructive/10 text-destructive border-destructive/20",
  expire: "bg-muted/60 text-muted-foreground border-border",
};

function PaymentStatusBadge({ status }: { status: string }) {
  const t = useTranslations("Status");
  const className =
    PAYMENT_STATUS_CLASSES[status] ?? PAYMENT_STATUS_CLASSES.pending;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium text-[11.5px]",
        className
      )}
    >
      {t(status)}
    </span>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-[13px] text-foreground">
        {value}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Order Info Section
// ---------------------------------------------------------------------------
export function OrderInfoSection({ orderId }: { orderId: string }) {
  const t = useTranslations("Orders.orderInfo");
  const { data: info } = useOrderInfo(orderId);

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3" />
          {t("orderInformation")}
        </span>
      </SectionHeading>
      <div className="flex flex-col gap-2.5">
        <Row label={t("status")} value={<StatusBadge status={info.status} />} />
        <Row label={t("createdAt")} value={formatDate(info.createdAt)} />
        <Row
          label={t("orderId")}
          value={
            <span className="font-mono text-[12px] uppercase">{orderId}</span>
          }
        />
      </div>
    </SectionCard>
  );
}

// ---------------------------------------------------------------------------
// Customer Section
// ---------------------------------------------------------------------------
export function CustomerSection({ orderId }: { orderId: string }) {
  const t = useTranslations("Orders.customer");
  const { data: customer } = useOrderCustomer(orderId);

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <User className="size-3" />
          {t("customerDetails")}
        </span>
      </SectionHeading>
      <div className="flex flex-col gap-2.5">
        <Row label={t("customerName")} value={customer.name} />
        <Row label={t("phoneNumber")} value={customer.phone} />
        {customer.memberId && (
          <Row
            label={t("member")}
            value={
              <span className="flex items-center gap-1 text-primary uppercase">
                <BadgeCheck className="size-3.5" />
                {customer.memberId}
              </span>
            }
          />
        )}
      </div>
    </SectionCard>
  );
}

// ---------------------------------------------------------------------------
// Deliveries Section
// ---------------------------------------------------------------------------
import { Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ... (keep existing imports and code until DeliveriesSection)

export function DeliveriesSection({ orderId }: { orderId: string }) {
  const t = useTranslations("Orders.delivery");
  const { data: deliveries } = useOrderDeliveries(orderId);

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <Truck className="size-3" />
          {t("logistics")}
        </span>
      </SectionHeading>
      {deliveries.length === 0 ? (
        <p className="text-[13px] text-muted-foreground">
          {t("noDeliveryDescription")}
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {deliveries.map((d) => (
            <div className="flex flex-col gap-2" key={d.id}>
              <Row
                label={t("status")}
                value={
                  <StatusBadge
                    status={
                      d.type === "delivery" && d.status === "picked_up"
                        ? "sedang_diantar"
                        : d.status
                    }
                  />
                }
              />
              <Row
                label={t("type")}
                value={
                  <Badge
                    className={
                      d.type === "delivery"
                        ? "border-blue-500/20 bg-blue-500/10 text-blue-700"
                        : "border-slate-500/20 bg-slate-500/10 text-slate-700"
                    }
                    variant={d.type === "delivery" ? "secondary" : "outline"}
                  >
                    {t(d.type)}
                  </Badge>
                }
              />
              <Row label={t("address")} value={d.address} />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

// ---------------------------------------------------------------------------
// Payment Section
// ---------------------------------------------------------------------------
export function PaymentSection({ orderId }: { orderId: string }) {
  const t = useTranslations("Orders.payment");
  const { data: payment } = useOrderPayment(orderId);

  const paymentTypeLabel: Record<string, string> = {
    qris: "QRIS",
    cash: t("statusValues.pending"), // Cash usually mapped to something, but let's just use labels
  };

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <CreditCard className="size-3" />
          {t("paymentInformation")}
        </span>
      </SectionHeading>
      <div className="flex flex-col gap-2.5">
        <Row
          label={t("paymentMethod")}
          value={
            paymentTypeLabel[payment.paymentType] ??
            payment.paymentType.toUpperCase()
          }
        />
        <Row
          label={t("status")}
          value={<PaymentStatusBadge status={payment.transactionStatus} />}
        />
        <div className="my-1 h-px bg-border/60" />
        <Row label={t("amountPaid")} value={formatRupiah(payment.amountPaid)} />
        {payment.change > 0 && (
          <Row label={t("change")} value={formatRupiah(payment.change)} />
        )}
      </div>
    </SectionCard>
  );
}

// ---------------------------------------------------------------------------
// Items Section
// ---------------------------------------------------------------------------
export function ItemsSection({ orderId }: { orderId: string }) {
  const t = useTranslations("Orders.items");
  const { data: orderData } = useOrderItems(orderId);
  const { items, voucher, points } = orderData;

  const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
  const voucherDiscount = voucher?.discountAmount ?? 0;
  const pointsDiscount = points?.points ?? 0;
  const total = subtotal + voucherDiscount + pointsDiscount;

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <Package className="size-3" />
          {t("orderItems")}
        </span>
      </SectionHeading>

      {/* Line items */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div className="flex items-start justify-between gap-3" key={item.id}>
            <div className="flex flex-col gap-0.5">
              <p className="font-medium text-[13.5px] text-foreground">
                {item.name}
              </p>
              <p className="text-[12px] text-muted-foreground">
                {item.qty} × {formatRupiah(item.price)}
              </p>
            </div>
            <span className="shrink-0 font-medium text-[13.5px] text-foreground">
              {formatRupiah(item.subtotal)}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-3.5 h-px bg-border/60" />

      {/* Deductions + total */}
      <div className="flex flex-col gap-2">
        <Row label={t("subtotal")} value={formatRupiah(subtotal)} />

        {voucher && (
          <Row
            label={`${t("voucher")} (${voucher.code})`}
            value={
              <span className="text-emerald-600 dark:text-emerald-400">
                − {formatRupiah(Math.abs(voucherDiscount))}
              </span>
            }
          />
        )}

        {points && pointsDiscount !== 0 && (
          <Row
            label={t("pointsRedeemed")}
            value={
              <span className="text-emerald-600 dark:text-emerald-400">
                − {formatRupiah(Math.abs(pointsDiscount))}
              </span>
            }
          />
        )}

        <div className="mt-1 h-px bg-border/60" />

        <div className="flex items-center justify-between">
          <span className="font-semibold text-[13.5px] text-foreground">
            Total
          </span>
          <span className="font-semibold text-[15px] text-foreground">
            {formatRupiah(total)}
          </span>
        </div>
      </div>
    </SectionCard>
  );
}
