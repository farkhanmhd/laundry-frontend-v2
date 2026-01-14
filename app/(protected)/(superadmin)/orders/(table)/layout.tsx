import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { ordersColumns } from "@/components/features/orders/column";
import { ReactNode } from "react";

const OrdersPage = ({ children }: { children: ReactNode}) => (
  <TableProvider columns={ordersColumns}>
    <TableToolbar />
            {children}
    <TablePagination />
  </TableProvider>
);

export default OrdersPage;
