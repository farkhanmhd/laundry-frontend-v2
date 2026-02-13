"use client";

import { useBestSellersColumns } from "@/components/features/sales/columns";
import type { BestSellerResponse } from "@/lib/modules/sales/data";
import { SalesTable } from "./sales-table";

interface Props {
  data: BestSellerResponse;
}

export const SalesOverviewTable = ({ data }: Props) => {
  const {
    items,
    meta: { total },
  } = data;
  const columns = useBestSellersColumns();
  return (
    <SalesTable columns={columns} items={items} tab="overview" total={total} />
  );
};
