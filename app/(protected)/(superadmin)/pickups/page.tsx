"use client";

import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { deliveriesColumns } from "./columns";
import { mockDeliveries } from "./data";
import { SelectedRows } from "./selected-rows";

const OrdersPage = () => (
  <TableProvider columns={deliveriesColumns}>
    <TableToolbar>
      <SelectedRows />
    </TableToolbar>
    {/* should be children here and this file should be layout.tsx */}
    <TableView data={mockDeliveries} />
    <TablePagination />
  </TableProvider>
);

export default OrdersPage;
