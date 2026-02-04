"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Client } from "@/components/utils/client";
import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle, formatToIDR } from "@/lib/utils";

export const PosPaymentSummary = () => {
  const {
    posData,
    totalAmount,
    pointsEarned,
    totalDiscount,
    totalAmountToBePaid,
    changeAmount,
    points: actualPointsUsed, // <--- Make sure this is destructured from your hook
  } = usePOS();

  return (
    <Card className="overflow-hidden" style={cardShadowStyle}>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-muted-foreground text-sm">
          <span>Payment Method</span>
          <span className="font-medium text-foreground uppercase">
            {posData.paymentMethod}
          </span>
        </div>

        <div className="flex justify-between border-t pt-3">
          <span className="text-sm">Items Total Amount</span>
          <Client>
            <span className="text-primary">{formatToIDR(totalAmount)}</span>
          </Client>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span>Total Discount</span>
            <Client>
              <span className="text-green-600">
                - {formatToIDR(totalDiscount)}
              </span>
            </Client>
          </div>
        )}

        {/* ✅ NEW: Points Redemption Section */}
        {actualPointsUsed && actualPointsUsed > 0 && (
          <div className="flex justify-between text-sm">
            <span>Points Redeemed</span>
            <Client>
              <span className="text-green-600">
                - {formatToIDR(actualPointsUsed)}
              </span>
            </Client>
          </div>
        )}

        {pointsEarned > 0 && (
          <div className="flex justify-between text-sm">
            <span>Points Earned</span>
            <Client>
              <span className="text-green-600">+{pointsEarned} pts</span>
            </Client>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span>Total</span>
          <Client>
            <span className="font-bold text-primary text-xl">
              {formatToIDR(totalAmountToBePaid)}
            </span>
          </Client>
        </div>

        {posData.paymentMethod === "cash" && (
          <>
            <div className="flex justify-between text-sm">
              <span>Cash Received</span>
              <Client>
                <span>{formatToIDR(posData.amountPaid)}</span>
              </Client>
            </div>
            <div className="flex justify-between border-t border-dashed pt-3">
              <span className="font-semibold">Change to Return</span>
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
