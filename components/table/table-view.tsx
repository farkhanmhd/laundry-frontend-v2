"use client";

import { useEffect } from "react";
import { useTableContext } from "@/components/table/context";
import DataTable from "@/components/table/data-table";

interface ProductsTableProps<TData extends { id: string }> {
  data: TData[] | undefined;
  total?: number;
}

export const TableView = <TData extends { id: string }>({
  data,
  total,
}: ProductsTableProps<TData>) => {
  const { table, setInternalData, columns, setTotalRow } = useTableContext();

  useEffect(() => {
    if (data) {
      setInternalData(data);
    }

    if (total) {
      setTotalRow(total);
    }
  }, [data, setInternalData, total, setTotalRow]);

  return <DataTable columns={columns} table={table} />;
};
