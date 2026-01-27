"use client";

import { Card, CardContent } from "@/components/ui/card";
import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle } from "@/lib/utils";
import { PosCustomerGuest } from "./pos-customer-guest";
import { PosCustomerSearch } from "./pos-customer-search";
import { PosCustomerTypeSelection } from "./pos-customer-type-selection";
import { PosNewMember } from "./pos-new-member";

export function PosCustomerSelection() {
  const { customerType, posData } = usePOS();

  return (
    <Card className="w-full" style={cardShadowStyle}>
      <PosCustomerTypeSelection />
      <CardContent className="space-y-4">
        {customerType === "member" ? (
          <div className="space-y-3">
            {posData.newMember ? <PosNewMember /> : <PosCustomerSearch />}
          </div>
        ) : (
          <PosCustomerGuest />
        )}
      </CardContent>
    </Card>
  );
}
