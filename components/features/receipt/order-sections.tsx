// components/features/receipt/order-sections.tsx
import {
  BadgeCheck,
  Clock,
  CreditCard,
  Package,
  Truck,
  User,
} from "lucide-react";
import {
  fetchOrderCustomer,
  fetchOrderDeliveries,
  fetchOrderInfo,
  fetchOrderItems,
  fetchOrderPayment,
} from "@/lib/modules/receipt/data";
import { SectionCard, SectionHeading } from "./order-ui";

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

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  processing: {
    label: "Processing",
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  pending: {
    label: "Pending",
    className: "bg-muted/60 text-muted-foreground border-border",
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium text-[11.5px] ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}

const PAYMENT_STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  settlement: {
    label: "Paid",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  deny: {
    label: "Denied",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  expire: {
    label: "Expired",
    className: "bg-muted/60 text-muted-foreground border-border",
  },
};

function PaymentStatusBadge({ status }: { status: string }) {
  const cfg = PAYMENT_STATUS_CONFIG[status] ?? PAYMENT_STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium text-[11.5px] ${cfg.className}`}
    >
      {cfg.label}
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
export async function OrderInfoSection({ orderId }: { orderId: string }) {
  const info = await fetchOrderInfo(orderId);

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3" />
          Order Info
        </span>
      </SectionHeading>
      <div className="flex flex-col gap-2.5">
        <Row label="Status" value={<StatusBadge status={info.status} />} />
        <Row label="Date" value={formatDate(info.createdAt)} />
        <Row
          label="Order ID"
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
export async function CustomerSection({ orderId }: { orderId: string }) {
  const customer = await fetchOrderCustomer(orderId);

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <User className="size-3" />
          Customer
        </span>
      </SectionHeading>
      <div className="flex flex-col gap-2.5">
        <Row label="Name" value={customer.name} />
        <Row label="Phone" value={customer.phone} />
        {customer.memberId && (
          <Row
            label="Member"
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
export async function DeliveriesSection({ orderId }: { orderId: string }) {
  const deliveries = await fetchOrderDeliveries(orderId);

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <Truck className="size-3" />
          Delivery
        </span>
      </SectionHeading>
      {deliveries.length === 0 ? (
        <p className="text-[13px] text-muted-foreground">
          Pickup — no delivery scheduled.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {deliveries.map((d) => (
            <div className="flex flex-col gap-2" key={d.id}>
              <Row label="Courier" value={d.courier} />
              <Row label="Status" value={d.status} />
              {d.trackingNumber && (
                <Row
                  label="Tracking"
                  value={
                    <span className="font-mono text-[12px]">
                      {d.trackingNumber}
                    </span>
                  }
                />
              )}
              <Row label="Address" value={d.address} />
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
export async function PaymentSection({ orderId }: { orderId: string }) {
  const payment = await fetchOrderPayment(orderId);

  const paymentTypeLabel: Record<string, string> = {
    qris: "QRIS",
    cash: "Cash",
    transfer: "Bank Transfer",
    card: "Card",
  };

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <CreditCard className="size-3" />
          Payment
        </span>
      </SectionHeading>
      <div className="flex flex-col gap-2.5">
        <Row
          label="Method"
          value={
            paymentTypeLabel[payment.paymentType] ??
            payment.paymentType.toUpperCase()
          }
        />
        <Row
          label="Status"
          value={<PaymentStatusBadge status={payment.transactionStatus} />}
        />
        <div className="my-1 h-px bg-border/60" />
        <Row label="Amount Paid" value={formatRupiah(payment.amountPaid)} />
        {payment.change > 0 && (
          <Row label="Change" value={formatRupiah(payment.change)} />
        )}
      </div>
    </SectionCard>
  );
}

// ---------------------------------------------------------------------------
// Items Section
// ---------------------------------------------------------------------------
export async function ItemsSection({ orderId }: { orderId: string }) {
  const { items, voucher, points } = await fetchOrderItems(orderId);

  const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
  const voucherDiscount = voucher?.discountAmount ?? 0;
  const pointsDiscount = points?.points ?? 0;
  const total = subtotal + voucherDiscount + pointsDiscount;

  return (
    <SectionCard>
      <SectionHeading>
        <span className="flex items-center gap-1.5">
          <Package className="size-3" />
          Items
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
        <Row label="Subtotal" value={formatRupiah(subtotal)} />

        {voucher && (
          <Row
            label={`Voucher (${voucher.code})`}
            value={
              <span className="text-emerald-600 dark:text-emerald-400">
                − {formatRupiah(Math.abs(voucherDiscount))}
              </span>
            }
          />
        )}

        {points && pointsDiscount !== 0 && (
          <Row
            label="Points Redeemed"
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
