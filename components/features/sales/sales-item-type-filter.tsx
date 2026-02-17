"use client";

import { Blocks } from "lucide-react";
import { useTranslations } from "next-intl";
import { QueryFacetedFilter } from "@/components/table/query-faceted-filter";
import { Button } from "@/components/ui/button";
import { cardShadowStyle, type SelectOption } from "@/lib/utils";

const itemTypeOptions = (
  t: ReturnType<typeof useTranslations<"Navigation.nav">>
): SelectOption[] => [
  {
    label: t("bundlings"),
    value: "bundling",
  },
  {
    label: t("inventories"),
    value: "inventory",
  },
  {
    label: t("services"),
    value: "service",
  },
];

export const SalesItemTypeFilter = () => {
  const t = useTranslations("Sales.columns.bestSellers");
  const nav = useTranslations("Navigation.nav");
  return (
    <QueryFacetedFilter
      options={itemTypeOptions(nav)}
      queryKey="item_type"
      title={t("type")}
    >
      <Button style={cardShadowStyle} variant="outline">
        <Blocks />
        {t("type")}
      </Button>
    </QueryFacetedFilter>
  );
};
