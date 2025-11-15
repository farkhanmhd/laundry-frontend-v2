"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";

export interface Voucher {
  id: string;
  code: string;
  name: string;
  pointsCost: number;
  discountAmount: number;
  isActive: boolean;
  isVisible: boolean;
  expiresAt: string;
}

export const vouchersColumns: ColumnDef<Voucher>[] = [
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
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <div className="font-medium font-mono">{row.getValue("code")}</div>
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
    accessorKey: "pointsCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Points Cost" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("pointsCost")} pts</div>
    ),
  },
  {
    accessorKey: "discountAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("discountAmount") as number;
      return (
        <div className="font-medium">
          Rp {new Intl.NumberFormat("id-ID").format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue("isActive") ? "default" : "secondary"}>
        {row.getValue("isActive") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "isVisible",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visible" />
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue("isVisible") ? "outline" : "secondary"}>
        {row.getValue("isVisible") ? "Visible" : "Hidden"}
      </Badge>
    ),
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expires" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("expiresAt") as string);
      return <div className="text-sm">{date.toLocaleDateString("id-ID")}</div>;
    },
  },
];
