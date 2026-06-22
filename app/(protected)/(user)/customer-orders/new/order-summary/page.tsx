"use client";

import { useTranslations } from "next-intl";
import { CustomerOrderDateTimePicker } from "@/components/features/customer-orders/customer-order-date-time-picker";
import { useCustomerOrder } from "@/components/features/customer-orders/state";
import { WeightRangePicker } from "@/components/features/customer-orders/weight-range-picker";
import { Button } from "@/components/ui/button";

export default function OrderSummaryPage() {
  const {
    submitPickupRequest,
    isPending,
    canRequestPickup,
    pickupDisabledReason,
    handleRequestTimeChange,
    customerCart,
    weightRanges,
    selectedWeightRange,
    setWeightRange,
    setWeight,
  } = useCustomerOrder();

  const t = useTranslations("CustomerOrders");

  const date = customerCart.requestTime
    ? new Date(customerCart.requestTime)
    : undefined;

  const handleDateChange = (newDate: Date | undefined) => {
    handleRequestTimeChange(newDate ? newDate.toISOString() : "");
  };

  return (
    <>
      {weightRanges && (
        <WeightRangePicker
          onWeightChange={setWeight}
          onWeightRangeChange={(range) => setWeightRange(range?.id ?? null)}
          selectedWeightRange={selectedWeightRange}
          weight={customerCart.weight}
          weightRanges={weightRanges}
        />
      )}
      <CustomerOrderDateTimePicker
        date={date}
        error={date ? undefined : t("orderSummary.noRequestTime")}
        onDateChange={handleDateChange}
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
