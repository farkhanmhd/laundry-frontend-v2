"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Client } from "@/components/utils/client";
import { cardShadowStyle, formatToIDR } from "@/lib/utils";
import { useCustomerOrder } from "./state";

export const CustomerOrderPaymentSummary = () => {
  const t = useTranslations("CustomerOrders");
  const {
    customerCart,
    totalAmount,
    pointsEarned,
    totalDiscount,
    totalAmountToBePaid,
  } = useCustomerOrder();

  return (
    <Card className="overflow-hidden" style={cardShadowStyle}>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-muted-foreground text-sm">
          <span>{t("paymentSummary.paymentMethod")}</span>
          <span className="font-medium text-foreground uppercase">
            {t("paymentSummary.qris")}
          </span>
        </div>

        <div className="flex justify-between border-t pt-3">
          <span className="text-sm">
            {t("paymentSummary.itemsTotalAmount")}
          </span>
          <Client>
            <span className="text-primary">{formatToIDR(totalAmount)}</span>
          </Client>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span>{t("paymentSummary.totalDiscount")}</span>
            <Client>
              <span className="text-green-600">
                - {formatToIDR(totalDiscount)}
              </span>
            </Client>
          </div>
        )}

        {customerCart.points && customerCart.points > 0 ? (
          <div className="flex justify-between text-sm">
            <span>{t("paymentSummary.pointsRedeemed")}</span>
            <Client>
              <span className="text-green-600">
                - {formatToIDR(customerCart.points)}
              </span>
            </Client>
          </div>
        ) : null}

        {pointsEarned > 0 && (
          <div className="flex justify-between text-sm">
            <span>{t("paymentSummary.pointsEarned")}</span>
            <Client>
              <span className="text-green-600">+{pointsEarned} pts</span>
            </Client>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span>{t("paymentSummary.total")}</span>
          <Client>
            <span className="font-bold text-primary text-xl">
              {formatToIDR(totalAmountToBePaid)}
            </span>
          </Client>
        </div>
      </CardContent>
    </Card>
  );
};
