"use client";

import { useTranslations } from "next-intl";
import { useCustomerOrder } from "@/components/features/customer-orders/state";
import { Button } from "@/components/ui/button";

export default function OrderSummaryPage() {
  const { submitPickupRequest, isPending } = useCustomerOrder();
  const t = useTranslations("CustomerOrders");
  return (
    <Button
      className="w-full"
      disabled={isPending}
      onClick={submitPickupRequest}
    >
      {t("orderSummary.requestPickup")}
    </Button>
  );
}
