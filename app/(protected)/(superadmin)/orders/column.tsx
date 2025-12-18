"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableRowActions } from "@/components/features/orders/data-table-row-actions"; // Adjust path as needed
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Order {
  id: string;
  customerName: string;
  memberId: string;
  total: number;
  status: "pending" | "processing" | "ready" | "completed";
  createdAt: string;
  items: number;
}

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <Link
        className={cn(buttonVariants({ variant: "link" }), "uppercase")}
        href={`/orders/${row.getValue("id")}`}
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "memberId",
    header: "Member ID",
    cell: ({ row }) => (
      <div className="text-sm uppercase">{row.getValue("memberId")}</div>
    ),
  },
  {
    accessorKey: "items",
    header: "Total Items",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("items")} items</div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = row.getValue("total") as number;
      return (
        <div className="font-medium">
          Rp {new Intl.NumberFormat("id-ID").format(amount)}
        </div>
      );
    },
  },
  // --- UPDATED COLUMN ---
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants = {
        pending: "secondary",
        processing: "outline", // Or generic 'outline'
        ready: "default", // Perhaps blue or green
        completed: "secondary", // Often greyed out when done
      } as const;

      // Safety check for variant
      const variant = variants[status as keyof typeof variants] || "secondary";

      return (
        <Badge className="capitalize" variant={variant}>
          {status}
        </Badge>
      );
    },
  },
  // ----------------------
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string);
      return <div className="text-sm">{date.toLocaleDateString("id-ID")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
