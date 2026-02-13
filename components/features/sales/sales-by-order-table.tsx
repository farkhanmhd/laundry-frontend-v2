"use client";

import type { SalesByOrderResponse } from "@/lib/modules/sales/data";
import { useSalesByOrderColumns } from "./columns";
import { SalesTable } from "./sales-table";

interface Props {
  data: SalesByOrderResponse;
}

export const SalesByOrderTable = ({ data }: Props) => {
  const {
    items,
    meta: { total },
  } = data;
  const columns = useSalesByOrderColumns();
  return (
    <SalesTable columns={columns} items={items} tab="orders" total={total} />
  );
};
