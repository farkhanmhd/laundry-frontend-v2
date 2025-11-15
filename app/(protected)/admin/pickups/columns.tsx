"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";

export interface Pickup {
  id: string;
  orderId: string;
  customerName: string;
  address: string;
  type: "pickup" | "dropoff";
  status: "requested" | "assigned" | "in_progress" | "completed" | "cancelled";
  requestedAt: string;
}

export const pickupsColumns: ColumnDef<Pickup>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery ID" />
    ),
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => (
      <div className="font-medium font-mono text-sm">
        {row.getValue("orderId")}
      </div>
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => (
      <div className="max-w-xs truncate text-muted-foreground text-sm">
        {row.getValue("address")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant={type === "pickup" ? "default" : "outline"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
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
      const statusMap = {
        requested: "secondary",
        assigned: "outline",
        in_progress: "default",
        completed: "default",
        cancelled: "destructive",
      } as const;
      const statusLabel = {
        requested: "Requested",
        assigned: "Assigned",
        in_progress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
      };
      return (
        <Badge variant={statusMap[status as keyof typeof statusMap]}>
          {statusLabel[status as keyof typeof statusLabel]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "requestedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("requestedAt") as string);
      return <div className="text-sm">{date.toLocaleDateString("id-ID")}</div>;
    },
  },
];
