"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";

export interface Inventory {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  safetyStock: number;
  unit: string;
  createdAt: string;
}

export const inventoriesColumns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-xs truncate text-muted-foreground text-sm">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return (
        <div className="font-medium">
          Rp {new Intl.NumberFormat("id-ID").format(price)}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number;
      const safetyStock = row.original.safetyStock;
      const isLow = stock <= safetyStock;
      return (
        <div className={`font-medium ${isLow ? "text-destructive" : ""}`}>
          {stock} {row.original.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "safetyStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Safety Stock" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.getValue("safetyStock")} {row.original.unit}
      </div>
    ),
  },
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    cell: ({ row }) => <Badge variant="outline">{row.getValue("unit")}</Badge>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string);
      return <div className="text-sm">{date.toLocaleDateString("id-ID")}</div>;
    },
  },
];
