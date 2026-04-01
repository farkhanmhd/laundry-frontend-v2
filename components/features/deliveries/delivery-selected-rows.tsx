"use client";

import { useTranslations } from "next-intl";
import { useTableContext } from "@/components/table/context";
import { Button } from "@/components/ui/button";

export const DeliverySelectedRows = () => {
  const t = useTranslations("Deliveries");
  const { table } = useTableContext<{ id: string }>();
  const selectedRows = Object.keys(table.getSelectedRowModel().rowsById);
  if (!selectedRows.length) {
    return null;
  }
  return (
    <Button className="flex rounded-none border-l">
      {t("selectedRows", { count: selectedRows.length })}
    </Button>
  );
};
