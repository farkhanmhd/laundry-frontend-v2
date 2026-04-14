"use client";

import { Banknote, ExternalLink, QrCode, Wallet } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useOrderDetail } from "@/components/features/orders/order-detail-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/components/utils/client";
import { cardShadowStyle, formatToIDR } from "@/lib/utils";

export const OrderPaymentCard = () => {
  const t = useTranslations("Orders.payment");
  const { payment, id, orderInfo } = useOrderDetail();
  const transactionStatus = payment?.transactionStatus;
  const isPending = transactionStatus === "pending";

  const renderPaymentStatus = () => {
    if (
      transactionStatus === "cancelled" ||
      orderInfo?.status === "cancelled"
    ) {
      return (
        <Badge variant="destructive">
          {t("statusValues.cancelled") || "Cancelled"}
        </Badge>
      );
    }

    if (transactionStatus === "pending" && payment?.actions) {
      return (
        <Button
          className="items-center text-xs uppercase"
          size="sm"
          variant="outline"
        >
          <ExternalLink className="h-3 w-3" />
          <Link href={`/orders/${id}/payment`}>{t("payNow")}</Link>
        </Button>
      );
    }

    if (transactionStatus === "pending") {
      return (
        <Button className="text-xs uppercase" size="sm" variant="outline">
          {t("payNow")}
          <ExternalLink className="h-3 w-3" />
        </Button>
      );
    }

    if (payment?.transactionStatus !== "pending") {
      return (
        <Badge
          variant={
            payment?.transactionStatus === "settlement"
              ? "default"
              : "secondary"
          }
        >
          {payment?.transactionStatus === "settlement"
            ? t("paid")
            : t(`statusValues.${payment?.transactionStatus}`)}
        </Badge>
      );
    }
  };

  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 font-semibold text-base">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          {t("paymentInformation")}
        </CardTitle>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">
            {t("paymentMethod")}
          </span>
          <div className="flex items-center gap-2 font-medium text-foreground text-sm">
            {payment?.paymentType === "qris" ? (
              <QrCode className="h-4 w-4 text-primary" />
            ) : (
              <Banknote className="h-4 w-4 text-primary" />
            )}
            <span className="capitalize">{payment?.paymentType || "-"}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">{t("status")}</span>
          <div>{renderPaymentStatus()}</div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">
            {isPending ? t("amountDue") : t("amountPaid")}
          </span>
          <span className="font-medium text-foreground text-sm">
            <Client>{formatToIDR(payment?.amountPaid ?? 0)}</Client>
          </span>
        </div>

        {payment?.change !== null && payment && payment.change > 0 && (
          <div className="mt-2 flex flex-col gap-1 border-border/50 border-t pt-4 sm:col-span-3">
            <span className="text-muted-foreground text-sm">
              {t("changeReturned")}
            </span>
            <span className="font-medium text-foreground text-sm">
              <Client>{formatToIDR(payment?.change)}</Client>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
