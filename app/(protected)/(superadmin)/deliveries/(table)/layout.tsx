"use client";

import type { ReactNode } from "react";
import { DeliverSelectedDelivery } from "@/components/features/deliveries/deliver-selected-delivery";
import { usePickupColumns } from "@/components/features/deliveries/pickup-columns";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";

const DeliveriesPage = ({ children }: { children: ReactNode }) => {
  const columns = usePickupColumns();

  return (
    <TableProvider columns={columns} manualPagination>
      <TableToolbar>
        <DeliverSelectedDelivery />
      </TableToolbar>
      {children}
      <TablePagination />
    </TableProvider>
  );
};

export default DeliveriesPage;
