"use client";

import { PosVoucherInput } from "@/components/features/pos/pos-voucher-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle } from "@/lib/utils";

const PosSummaryVoucherSlot = ({ children }: { children: React.ReactNode }) => {
  const { customerType, posData } = usePOS();

  if (customerType === "guest" || !posData.member) {
    return null;
  }

  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="border-b [.border-b]:pb-3.5">
        <CardTitle className="font-semibold text-card-foreground text-lg">
          Vouchers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <PosVoucherInput />
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default PosSummaryVoucherSlot;
