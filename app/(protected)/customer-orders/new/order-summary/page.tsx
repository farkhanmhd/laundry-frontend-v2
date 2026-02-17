"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function OrderSummaryPage() {
  const t = useTranslations("CustomerOrders");
  return <Button className="w-full">{t("orderSummary.requestPickup")}</Button>;
}
