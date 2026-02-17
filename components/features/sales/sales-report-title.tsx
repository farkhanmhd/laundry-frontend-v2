"use client";

import { useTranslations } from "next-intl";
import { useSalesTab } from "./sales-state";

export const SalesReportTitle = () => {
  const { tab } = useSalesTab();
  const t = useTranslations("Sales.tabs");

  const titleKey = {
    overview: "overviewTitle",
    orders: "ordersTitle",
    items: "itemsTitle",
  }[tab];

  return (
    <h1 className="font-semibold text-2xl">{t(titleKey as keyof typeof t)}</h1>
  );
};
