"use client";

import type { ReactNode } from "react";
import { useInventoryHistoryColumns } from "@/components/features/inventories/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";

const InventoryHistoryLayout = ({ children }: { children: ReactNode }) => {
  const columns = useInventoryHistoryColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default InventoryHistoryLayout;
