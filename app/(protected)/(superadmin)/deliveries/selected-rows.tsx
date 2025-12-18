"use client";

import { useTableContext } from "@/components/table/context";
import { Button } from "@/components/ui/button";

export const SelectedRows = () => {
  const { table } = useTableContext();
  const selectedRows = Object.keys(table.getSelectedRowModel().rowsById);
  if (!selectedRows.length) {
    return null;
  }
  return (
    <Button className="flex rounded-none border-l">
      Deliver {selectedRows.length} Order(s)
    </Button>
  );
};
