import { CreditCard } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomerOrdersApi } from "@/lib/modules/customer-orders/data";
import { cardShadowStyle, cn, formatToIDR } from "@/lib/utils";

type OrderDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPayment({ params }: OrderDetailProps) {
  const { id } = await params;
  const t = await getTranslations("CustomerOrders.orderDetail");
  const payment = await CustomerOrdersApi.getCustomerOrderPayment(id);

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
            {payment?.method || "-"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t("status")}</span>
          {payment?.status === "settlement" ? (
            <Badge>PAID</Badge>
          ) : (
            <Badge variant="destructive">UNPAID</Badge>
          )}
        </div>
        {payment && (
          <>
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
          </>
        )}
        <Separator className="bg-sidebar-border" />
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-sidebar-foreground">
            {t("total")}
          </span>
          <span className="font-bold text-lg text-primary">
            {formatToIDR(payment?.total || 0)}
          </span>
        </div>
        {payment && payment.status !== "settlement" && (
          <Link
            className={cn(buttonVariants(), "w-full")}
            href={`/customer-orders/${id}/payment`}
          >
            {t("payWithQris")}
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
