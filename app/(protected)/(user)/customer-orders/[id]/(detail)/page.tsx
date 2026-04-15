"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { use } from "react";
import {
  CustomerOrderDetailProvider,
  useCustomerOrderDetail,
} from "@/components/features/customer-orders/customer-order-detail-context";
import { CustomerPaymentDialog } from "@/components/features/customer-orders/customer-payment-dialog";
import { RequestDeliverySection } from "@/components/features/customer-orders/request-delivery-section";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cardShadowStyle, cn, formatDate, formatToIDR } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

type OrderStatus =
  | "pending"
  | "processing"
  | "ready"
  | "completed"
  | "cancelled";

const OrderStatusBadge = ({
  status,
  t,
}: {
  status: OrderStatus;
  t: (key: string) => string;
}) => {
  const config: Record<
    OrderStatus,
    {
      label: string;
      variant: "destructive" | "outline" | "secondary" | "default";
    }
  > = {
    pending: {
      label: t("paymentRequired"),
      variant: "destructive",
    },
    processing: {
      label: t("processing"),
      variant: "outline",
    },
    ready: {
      label: t("ready"),
      variant: "secondary",
    },
    cancelled: {
      label: t("cancelled"),
      variant: "outline",
    },
    completed: {
      label: t("completed"),
      variant: "default",
    },
  };

  const { label, variant } = config[status] || config.pending;

  return (
    <Badge
      className="font-semibold text-xs uppercase"
      style={cardShadowStyle}
      variant={variant}
    >
      {label}
    </Badge>
  );
};

const OrderDetailHeader = ({ orderId }: { orderId: string }) => {
  const t = useTranslations("CustomerOrders.orderDetail");
  const { detail } = useCustomerOrderDetail();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-foreground text-xl uppercase tracking-tight">
          {t("orderItems")} {orderId}
        </h1>
        <OrderStatusBadge status={detail.status} t={t} />
      </div>
      <p className="mt-1 flex items-center gap-2 text-muted-foreground text-sm">
        <Calendar className="h-4 w-4" />
        {formatDate(detail.createdAt)}
      </p>
    </div>
  );
};

const OrderDetailHeaderLoading = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-4 w-40" />
    </div>
  );
};

const OrderDetailItems = () => {
  const t = useTranslations("CustomerOrders.orderDetail");
  const { items } = useCustomerOrderDetail();

  const isItemDiscount = (itemType: (typeof items)[number]["itemType"]) =>
    ["voucher", "points"].includes(itemType);

  return (
    <Card className="shadow-card-shadow" style={cardShadowStyle}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Package className="h-5 w-5 text-muted-foreground" />
          {t("orderItems")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div className="rounded-xl border p-3" key={item.id}>
              <div className="flex flex-1 flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="line-clamp-1 font-semibold text-foreground">
                      {isItemDiscount(item.itemType) ? item.note : item.name}
                    </h4>
                  </div>
                  {!isItemDiscount(item.itemType) && (
                    <p className="text-muted-foreground text-sm">
                      {item.quantity} x {formatToIDR(item.price)}
                    </p>
                  )}
                </div>
                {!isItemDiscount(item.itemType) && !!item.note && (
                  <div className="mt-3 flex items-start gap-2 rounded-md bg-muted/30 p-2 text-muted-foreground text-xs">
                    <span className="italic">"{item.note}"</span>
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <span className="font-medium text-sm">{t("subtotal")}</span>
                  <span
                    className={cn("font-bold", {
                      "text-green-600": isItemDiscount(item.itemType),
                      "text-primary": !isItemDiscount(item.itemType),
                    })}
                  >
                    {formatToIDR(item.subtotal)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const OrderDetailItemsLoading = () => {
  return (
    <div className="space-y-3 rounded-md border p-3" style={cardShadowStyle}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center justify-between border-t pt-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
};

const OrderDetailPayment = ({ orderId }: { orderId: string }) => {
  const t = useTranslations("CustomerOrders.orderDetail");
  const { payment, deliveries } = useCustomerOrderDetail();

  const hasCompletedPickup = deliveries.find(
    (delivery) => delivery.type === "pickup" && delivery.status === "completed"
  );

  const canMakePayment =
    payment.status !== "settlement" &&
    !payment.actions?.length &&
    hasCompletedPickup;

  const qrisReadyPayment =
    payment.status !== "settlement" && !!payment.actions?.length;

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-sidebar-foreground">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          {t("paymentSummary")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("method")}</span>
          <span className="font-medium text-sidebar-foreground uppercase">
            {payment.method || "-"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("status")}</span>
          {payment.status === "settlement" ? (
            <Badge>PAID</Badge>
          ) : (
            <Badge variant="destructive">UNPAID</Badge>
          )}
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("amountPaid")}</span>
          <span className="font-medium text-sidebar-foreground">
            {formatToIDR(payment.amountPaid)}
          </span>
        </div>
        {(payment.change ?? 0) > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("change")}</span>
            <span className="font-medium text-sidebar-foreground">
              {formatToIDR(payment.change || 0)}
            </span>
          </div>
        )}
        <Separator className="bg-sidebar-border" />
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-sidebar-foreground">
            {t("total")}
          </span>
          <span className="font-bold text-lg text-primary">
            {formatToIDR(payment.total || 0)}
          </span>
        </div>
        {canMakePayment && <CustomerPaymentDialog />}
        {qrisReadyPayment && (
          <Link
            className={cn(buttonVariants(), "w-full")}
            href={`/customer-orders/${orderId}/payment`}
          >
            {t("payNow")}
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

const OrderDetailPaymentLoading = () => {
  return (
    <div className="space-y-3 rounded-md border p-4" style={cardShadowStyle}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

const OrderDetailDeliveries = () => {
  const t = useTranslations("CustomerOrders.orderDetail");
  const { detail, deliveries, canRequestDelivery } = useCustomerOrderDetail();

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
          <Truck className="h-4 w-4 text-muted-foreground" />
          {t("deliveryDetails")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {deliveries.length > 0 && (
          <div className="space-y-6">
            {deliveries.map((delivery, index) => (
              <div key={delivery.id}>
                {index > 0 && <Separator className="mb-4 bg-border" />}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {delivery.type === "pickup" ? (
                        <ArrowDownCircle className="h-4 w-4 text-chart-2" />
                      ) : (
                        <ArrowUpCircle className="h-4 w-4 text-primary" />
                      )}
                      <span className="font-semibold text-foreground text-sm capitalize">
                        {delivery.type === "pickup"
                          ? t("pickUp")
                          : t("delivery")}
                      </span>
                    </div>
                    <Badge
                      className="bg-secondary text-secondary-foreground text-xs uppercase"
                      variant="secondary"
                    >
                      {delivery.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {delivery.label || t("address")}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {delivery.address}
                      </p>
                      {delivery.notes && (
                        <p className="mt-1 text-muted-foreground text-xs italic">
                          {t("note")}: "{delivery.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {canRequestDelivery && (
          <RequestDeliverySection
            hasExistingDeliveries={deliveries.length > 0}
            isReady={detail.status === "ready"}
            labels={{
              readyForDelivery: t("readyForDelivery"),
              homeDelivery: t("homeDelivery"),
              readyForDeliveryDescription: t("readyForDeliveryDescription"),
              homeDeliveryDescription: t("homeDeliveryDescription"),
              requestDelivery: t("requestDelivery"),
              confirmAddress: t("confirmAddress"),
              cancel: t("cancel"),
            }}
          />
        )}

        {deliveries.length === 0 && (
          <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
            <div className="rounded-full bg-secondary/50 p-4">
              <Truck className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                {t("noDeliveryDetails")}
              </p>
              <p className="mx-auto max-w-xs text-muted-foreground text-sm">
                {t("noDeliveryServices")}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const CancelPickupRequestButton = () => {
  const t = useTranslations("CustomerOrders.orderDetail");
  const {
    canCancelPickupRequest,
    handleCancelPickupRequest,
    isCancellingPickupRequest,
  } = useCustomerOrderDetail();

  if (!canCancelPickupRequest) {
    return null;
  }

  return (
    <Button
      className="w-full"
      disabled={isCancellingPickupRequest}
      onClick={handleCancelPickupRequest}
      variant="outline"
    >
      {t("cancelPickupRequest")}
    </Button>
  );
};

const OrderDetailDeliveriesLoading = () => {
  return (
    <div className="space-y-3 rounded-md border p-4" style={cardShadowStyle}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex items-start gap-2">
        <Skeleton className="mt-1 h-4 w-4" />
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
};

const OrderDetailContent = ({ orderId }: { orderId: string }) => {
  const t = useTranslations("CustomerOrders.orderDetail");
  const { error, isError, isLoading } = useCustomerOrderDetail();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-8 p-4 md:p-6">
        <OrderDetailHeaderLoading />
        <div className="grid grid-cols-1 gap-6">
          <OrderDetailItemsLoading />
          <div className="space-y-6">
            <OrderDetailPaymentLoading />
            <OrderDetailDeliveriesLoading />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl p-4 md:p-6">
        <Card style={cardShadowStyle}>
          <CardContent className="space-y-3 py-10 text-center">
            <p className="font-medium text-destructive">
              {error?.message ?? t("tryAgain")}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[calc(100dvh-128px)] max-w-3xl space-y-8 p-4 md:min-h-[calc(100dvh-64px)] md:p-6">
      <OrderDetailHeader orderId={orderId} />
      <div className="grid grid-cols-1 gap-6">
        <OrderDetailItems />
        <div className="space-y-6">
          <OrderDetailPayment orderId={orderId} />
          <OrderDetailDeliveries />
          <CancelPickupRequestButton />
        </div>
      </div>
    </div>
  );
};

export default function OrderDetailPage({ params }: Props) {
  const orderId = use(params).id;

  return (
    <CustomerOrderDetailProvider orderId={orderId}>
      <OrderDetailContent orderId={orderId} />
    </CustomerOrderDetailProvider>
  );
}
