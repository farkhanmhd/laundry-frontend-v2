"use client";

import { CustomerOrderVoucherInput } from "@/components/features/customer-orders/customer-order-voucher-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardShadowStyle } from "@/lib/utils";

const CustomerVoucherLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card style={cardShadowStyle}>
      <CardHeader className="border-b [.border-b]:pb-3.5">
        <CardTitle className="font-semibold text-card-foreground text-lg">
          Vouchers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <CustomerOrderVoucherInput />
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerVoucherLayout;
