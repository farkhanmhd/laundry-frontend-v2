"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";

export interface CustomerOrder {
  id: string;
  orderDate: string;
  total: number;
  status: "pending" | "processing" | "ready" | "completed";
  itemCount: number;
}

export const customerOrdersColumns: ColumnDef<CustomerOrder>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => (
      <Link
        className="font-medium font-mono text-primary hover:underline"
        href={`/my-orders/${row.getValue("id")}`}
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "itemCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("itemCount")} item(s)</div>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("total") as number;
      return (
        <div className="font-medium">
          Rp {new Intl.NumberFormat("id-ID").format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants = {
        pending: "secondary",
        processing: "outline",
        ready: "default",
        completed: "default",
      } as const;
      return (
        <Badge variant={variants[status as keyof typeof variants]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ordered" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("orderDate") as string);
      return <div className="text-sm">{date.toLocaleDateString("id-ID")}</div>;
    },
  },
];
