"use client";

import { TableProvider } from "@/components/table/context";
import { TablePagination } from "@/components/table/table-pagination";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableView } from "@/components/table/table-view";
import { usePickupsColumns } from "./columns";
import { mockDeliveries } from "./data";
import { SelectedRows } from "./selected-rows";

const PickupsPage = () => {
  const columns = usePickupsColumns();

  return (
    <TableProvider columns={columns}>
      <TableToolbar>
        <SelectedRows />
      </TableToolbar>
      <TableView data={mockDeliveries} />
      <TablePagination />
    </TableProvider>
  );
};

export default PickupsPage;
