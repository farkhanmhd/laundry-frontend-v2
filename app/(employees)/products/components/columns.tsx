"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Product } from "../data";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label='Select all'
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => <Checkbox aria-label='Select row' checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Image' />,
    cell: ({ row }) => (
      <div className='line-clamp-1 min-w-max font-medium uppercase'>
        <Image alt='Product Image' className='max-h-[60px] rounded-lg' height={60} src={row.getValue("image") || "/placeholder.svg"} unoptimized width={60} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => (
      <Link className={cn("line-clamp-1 min-w-max font-medium uppercase", buttonVariants({ variant: "link", size: "sm" }), "text-sidebar-ring")} href={`/products/${row.getValue("id")}`}>
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => <div className='line-clamp-1 min-w-max font-medium'>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Price' />,
    cell: ({ row }) => <div className='line-clamp-1 min-w-max font-medium'>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "currentQuantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Quantity' />,
    cell: ({ row }) => <div className='line-clamp-1 min-w-max font-medium uppercase'>{row.getValue("currentQuantity")}</div>,
  },
  {
    accessorKey: "reorderPoint",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Reorder Point' />,
    cell: ({ row }) => <div className='line-clamp-1 min-w-max font-medium uppercase'>{row.getValue("reorderPoint")}</div>,
  },
  {
    id: "stockStatus",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const stockStatus = row.original.currentQuantity >= row.original.reorderPoint ? "In Stock" : "Shortage";

      return (
        <div className='min-w-max font-medium uppercase'>
          <Badge className='rounded-none font-bold' variant={stockStatus === "Shortage" ? "destructive" : "default"}>
            {stockStatus}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Date Added' />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = format(date, "PP, HH:mm");
      return <div className='line-clamp-1 min-w-max font-medium'>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Last Update' />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formattedDate = format(date, "PP, HH:mm");
      return <div className='line-clamp-1 min-w-max font-medium'>{formattedDate}</div>;
    },
  },
];
