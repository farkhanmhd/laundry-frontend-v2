"use client";

import { useSalesItemLogsColumns } from "@/components/features/sales/columns";
import type { SalesByItemsResponse } from "@/lib/modules/sales/data";
import { SalesTable } from "./sales-table";

interface Props {
  data: SalesByItemsResponse;
}

export const SalesByItemTable = ({ data }: Props) => {
  const {
    items,
    meta: { total },
  } = data;
  const columns = useSalesItemLogsColumns();
  return (
    <SalesTable columns={columns} items={items} tab="items" total={total} />
  );
};
