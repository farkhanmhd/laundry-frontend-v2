"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePOS } from "@/lib/modules/pos/state";
import { cardShadowStyle } from "@/lib/utils";

interface OrderSummaryPromoProps {
  title?: string;
  onApply?: () => void;
  onCheckMore?: () => void;
  isApplied?: boolean;
}

export function OrderSummaryVoucher({
  title = "17,5k off delivery.",
  onApply,
  onCheckMore,
  isApplied = false,
}: OrderSummaryPromoProps) {
  const t = useTranslations("CustomerOrders");
  const { posData } = usePOS();

  if (posData.customerType === "guest") {
    return null;
  }

  return (
    <div
      className="w-full overflow-hidden rounded-xl bg-card"
      style={cardShadowStyle}
    >
      {/* Top Section: Active/Suggested Promo */}
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-sm tracking-tight">{title}</h3>
        </div>
        <Button className="rounded-full" onClick={onApply} size="sm">
          {isApplied ? t("voucher.remove") : t("voucher.apply")}
        </Button>
      </div>

      {/* Bottom Section: Check More Link */}
      <Button
        className="flex w-full cursor-pointer items-center justify-between rounded-none border-t px-4 py-6"
        onClick={onCheckMore}
        variant="link"
      >
        <span>{t("voucher.checkMore")}</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
