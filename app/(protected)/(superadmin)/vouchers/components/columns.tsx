"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
import { formatToIDR } from "@/lib/utils";
import type { Voucher } from "../data";

export const columns: ColumnDef<Voucher>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       aria-label="Select all"
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       aria-label="Select row"
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        {row.getValue("id")}
      </div>
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {row.getValue("name")}
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
        {formatToIDR(row.getValue("discountAmount"))}
      </div>
    ),
  },
  {
    accessorKey: "pointsCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {row.getValue("pointsCost")}
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
    accessorKey: "isActive",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const active = row.original.isActive;
      return (
        <div className="min-w-max font-medium uppercase">
          <Badge className="font-bold" variant={active ? "default" : "outline"}>
            {active ? "Active" : "Expired"}
          </Badge>
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
