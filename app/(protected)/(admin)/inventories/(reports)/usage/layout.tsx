"use client";

import type { ReactNode } from "react";
import { useInventoryUsageHistoryColumns } from "@/components/features/inventories/columns";
import { TableProvider } from "@/components/table/context";

const InventoryUsageHistoryLayout = ({ children }: { children: ReactNode }) => {
  const columns = useInventoryUsageHistoryColumns();

  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:h-[calc(100dvh-64px)]">
      <TableProvider columns={columns} manualPagination>
        {children}
      </TableProvider>
    </section>
  );
};

export default InventoryUsageHistoryLayout;
