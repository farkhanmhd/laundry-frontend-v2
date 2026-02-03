"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Client } from "@/components/utils/client";
import type { Voucher } from "@/lib/modules/vouchers/data";
// import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatToIDR } from "@/lib/utils";

export const columns: ColumnDef<Voucher>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <Link
        className={cn(
          "line-clamp-1 min-w-max font-medium uppercase",
          buttonVariants({ variant: "link", size: "sm" }),
          "text-sidebar-ring"
        )}
        href={`/vouchers/${row.getValue("id")}`}
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        {row.getValue("code")}
      </div>
    ),
  },
  {
    accessorKey: "discountPercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Percentage" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {Number(row.getValue("discountPercentage")) > 0
          ? `${row.getValue("discountPercentage")} %`
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "discountAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {Number(row.getValue("discountAmount")) > 0
          ? formatToIDR(row.getValue("discountAmount"))
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "minSpend",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Min Spend" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        <Client>{formatToIDR(row.getValue("minSpend"))}</Client>
      </div>
    ),
  },
  {
    accessorKey: "maxDiscountAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Discount" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        <Client>{formatToIDR(row.getValue("maxDiscountAmount"))}</Client>
      </div>
    ),
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiry" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("expiresAt"));
      const formattedDate = format(date, "PP, HH:mm");
      return (
        <div className="line-clamp-1 min-w-max font-medium">
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Added" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = format(date, "PP, HH:mm");
      return (
        <div className="line-clamp-1 min-w-max font-medium">
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "isVisible",
    header: () => <div>Visibility</div>,
    cell: ({ row }) => {
      const active = row.original.isVisible;
      return (
        <div className="min-w-max font-medium uppercase">
          <Badge className="font-bold" variant={active ? "default" : "outline"}>
            {active ? "Visible" : "Hidden"}
          </Badge>
        </div>
      );
    },
  },
];
