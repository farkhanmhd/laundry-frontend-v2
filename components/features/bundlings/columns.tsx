"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { buttonVariants } from "@/components/ui/button";
import type { Bundling } from "@/lib/modules/bundlings/data";
// import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatToIDR } from "@/lib/utils";

export const columns: ColumnDef<Bundling>[] = [
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        <Image
          alt="Bundling Image"
          className="max-h-[60px] w-auto rounded-lg"
          height={60}
          src={row.getValue("image") || "/placeholder.svg"}
          width={60}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
        href={`/bundlings/${row.getValue("id")}`}
      >
        {row.getValue("id")}
      </Link>
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
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium">
        {formatToIDR(row.getValue("price"))}
      </div>
    ),
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
];
