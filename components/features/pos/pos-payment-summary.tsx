"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Client } from "@/components/utils/client";
import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle, formatToIDR } from "@/lib/utils";

export const PosPaymentSummary = () => {
  const t = useTranslations("POS.paymentSummary");
  const {
    posData,
    totalAmount,
    pointsEarned,
    totalDiscount,
    totalAmountToBePaid,
    changeAmount,
    points: actualPointsUsed,
  } = usePOS();

  return (
    <Card className="overflow-hidden" style={cardShadowStyle}>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-muted-foreground text-sm">
          <span>{t("paymentMethod")}</span>
          <span className="font-medium text-foreground uppercase">
            {posData.paymentMethod === "cash" ? t("cash") : t("qris")}
          </span>
        </div>

        <div className="flex justify-between border-t pt-3">
          <span className="text-sm">{t("itemsTotalAmount")}</span>
          <Client>
            <span className="text-primary">{formatToIDR(totalAmount)}</span>
          </Client>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span>{t("totalDiscount")}</span>
            <Client>
              <span className="text-green-600">
                - {formatToIDR(totalDiscount)}
              </span>
            </Client>
          </div>
        )}

        {actualPointsUsed && actualPointsUsed > 0 ? (
          <div className="flex justify-between text-sm">
            <span>{t("pointsRedeemed")}</span>
            <Client>
              <span className="text-green-600">
                - {formatToIDR(actualPointsUsed)}
              </span>
            </Client>
          </div>
        ) : null}

        {pointsEarned > 0 && (
          <div className="flex justify-between text-sm">
            <span>{t("pointsEarned")}</span>
            <Client>
              <span className="text-green-600">+{pointsEarned} pts</span>
            </Client>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span>{t("total")}</span>
          <Client>
            <span className="font-bold text-primary text-xl">
              {formatToIDR(totalAmountToBePaid)}
            </span>
          </Client>
        </div>

        {posData.paymentMethod === "cash" && (
          <>
            <div className="flex justify-between text-sm">
              <span>{t("cashReceived")}</span>
              <Client>
                <span>{formatToIDR(posData.amountPaid)}</span>
              </Client>
            </div>
            <div className="flex justify-between border-t border-dashed pt-3">
              <span className="font-semibold">{t("changeToReturn")}</span>
              <Client>
                <span className="font-bold text-lg">
                  {formatToIDR(changeAmount)}
                </span>
              </Client>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
