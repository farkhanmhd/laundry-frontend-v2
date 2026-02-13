import { Banknote, ExternalLink, QrCode, Wallet } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/components/utils/client";
import { cardShadowStyle, formatToIDR } from "@/lib/utils";

interface OrderPaymentProps {
  orderId: string;
  data: {
    paymentType: "qris" | "cash" | null;
    transactionStatus: string;
    amountPaid: number;
    change: number | null;
  };
}

export const OrderPaymentCard = ({ orderId, data }: OrderPaymentProps) => {
  const t = useTranslations("Orders.payment");
  const isPending = data.transactionStatus === "pending";

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
            {data.paymentType === "qris" ? (
              <QrCode className="h-4 w-4 text-primary" />
            ) : (
              <Banknote className="h-4 w-4 text-primary" />
            )}
            <span className="capitalize">{data.paymentType || "-"}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">{t("status")}</span>
          <div>
            {isPending ? (
              <Link
                className="group inline-block"
                href={`/orders/${orderId}/payment`}
              >
                <Badge
                  className="flex cursor-pointer items-center gap-1 px-2 py-0.5 text-[10px] uppercase transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                  variant="secondary"
                >
                  {t("payNow")}
                  <ExternalLink className="h-3 w-3" />
                </Badge>
              </Link>
            ) : (
              <Badge
                variant={
                  data.transactionStatus === "settlement"
                    ? "default"
                    : "secondary"
                }
              >
                {data.transactionStatus === "settlement"
                  ? t("paid")
                  : data.transactionStatus}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">
            {isPending ? t("amountDue") : t("amountPaid")}
          </span>
          <span className="font-medium text-foreground text-sm">
            <Client>{formatToIDR(data.amountPaid)}</Client>
          </span>
        </div>

        {data.change !== null && data.change > 0 && (
          <div className="mt-2 flex flex-col gap-1 border-border/50 border-t pt-4 sm:col-span-3">
            <span className="text-muted-foreground text-sm">
              {t("changeReturned")}
            </span>
            <span className="font-medium text-foreground text-sm">
              <Client>{formatToIDR(data?.change)}</Client>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
