import type { ReactNode } from "react";
import { inventoryHistoryColumns } from "@/components/features/inventories/columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";

const InventoryHistoryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <TableProvider columns={inventoryHistoryColumns} manualPagination>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default InventoryHistoryLayout;
