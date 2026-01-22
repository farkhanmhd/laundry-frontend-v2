import type { ReactNode } from "react";
import { ordersColumns } from "@/components/features/orders/column";
import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";

const OrdersPage = ({ children }: { children: ReactNode }) => (
  <TableProvider columns={ordersColumns} manualPagination>
    <TableToolbar />
    {children}
    <TablePagination />
  </TableProvider>
);

export default OrdersPage;
