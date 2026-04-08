"use client";

import type { ReactNode } from "react";
import { usePickupColumns } from "@/components/features/deliveries/pickup-columns";
import { PickupSelectedDelivery } from "@/components/features/deliveries/pickup-selected-delivery";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";

const PickupsPage = ({ children }: { children: ReactNode }) => {
  const columns = usePickupColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      <TableToolbar>
        <PickupSelectedDelivery />
      </TableToolbar>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default PickupsPage;
