"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableRowActions } from "@/components/features/orders/data-table-row-actions"; // Adjust path as needed
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatToIDR } from "@/lib/utils";
import { Client } from "@/components/utils/client";

export interface Order {
  id: string;
  customerName: string;
  memberId?: string | null | undefined;
  total: number;
  status: "pending" | "processing" | "ready" | "completed";
  createdAt: string;
  totalItems: number;
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
    cell: ({ row }) => {
      const memberId: string = row.getValue('memberId') ? row.getValue('memberId') : '-'

      return (
        <div className="text-sm capitalize">{memberId}</div>
      )
    },
  },
  {
    accessorKey: "totalItems",
    header: "Total Items",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue('totalItems')} items</div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = formatToIDR(row.getValue("total"));
      return (
        <div className="font-medium">
          <Client>
            {amount}
          </Client>
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
