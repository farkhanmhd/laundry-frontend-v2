"use client";

import type { ReactNode } from "react";
import { useAdjustmentHistoryColumns } from "@/components/features/inventories/columns";
import { TableProvider } from "@/components/table/context";

const InventoryHistoryLayout = ({ children }: { children: ReactNode }) => {
  const columns = useAdjustmentHistoryColumns();

  return (
    <section className="min-h-[calc(100dvh-128px)] space-y-6 p-6 md:h-[calc(100dvh-64px)]">
      <TableProvider columns={columns} manualPagination>
        {children}
      </TableProvider>
    </section>
  );
};

export default InventoryHistoryLayout;
