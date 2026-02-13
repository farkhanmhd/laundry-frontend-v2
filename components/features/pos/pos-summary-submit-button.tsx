"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePOS } from "@/lib/modules/pos/state";

export const PosSummarySubmitButton = () => {
  const t = useTranslations("POS.summarySubmitButton");
  const { totalItems, isPending, submitPosOrder } = usePOS();
  return (
    <Button
      className="w-full"
      disabled={totalItems === 0 || isPending}
      onClick={submitPosOrder}
    >
      {t("processPayment")}
    </Button>
  );
};
