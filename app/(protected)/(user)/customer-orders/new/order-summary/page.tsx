"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { CustomerOrderDateTimePicker } from "@/components/features/customer-orders/customer-order-date-time-picker";
import { useCustomerOrder } from "@/components/features/customer-orders/state";
import { Button } from "@/components/ui/button";

export default function OrderSummaryPage() {
  const {
    submitPickupRequest,
    isPending,
    canRequestPickup,
    pickupDisabledReason,
    handleRequestTimeChange,
  } = useCustomerOrder();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const handleRequestTimeChangeRef = useRef(handleRequestTimeChange);
  handleRequestTimeChangeRef.current = handleRequestTimeChange;

  useEffect(() => {
    if (date) {
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 0);
      handleRequestTimeChangeRef.current(endOfDay.toISOString());
    }
  }, [date]);

  const t = useTranslations("CustomerOrders");

  return (
    <>
      <CustomerOrderDateTimePicker
        date={date}
        error={date ? undefined : t("orderSummary.noRequestTime")}
        onDateChange={setDate}
      />
      <Button
        className="w-full"
        disabled={isPending || !canRequestPickup}
        onClick={submitPickupRequest}
      >
        {t("orderSummary.requestPickup")}
      </Button>
      {pickupDisabledReason && pickupDisabledReason !== "noRequestTime" && (
        <p className="mt-1 text-muted-foreground text-sm">
          {t(`orderSummary.${pickupDisabledReason}`)}
        </p>
      )}
    </>
  );
}
