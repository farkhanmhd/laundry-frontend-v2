"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  PackagePlus,
  ShoppingCart,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type {
  Inventory,
  InventoryHistory,
} from "@/lib/modules/inventories/data";
import { cn, formatToIDR, type SelectOption } from "@/lib/utils";

export const inventoryCategoryOptions: SelectOption[] = [
  {
    label: "Waste",
    value: "waste",
    icon: <Trash2 className="h-4 w-4" />,
  },
  {
    label: "Adjustment",
    value: "adjustment",
    icon: <SlidersHorizontal className="h-4 w-4" />,
  },
  {
    label: "Restock",
    value: "restock",
    icon: <PackagePlus className="h-4 w-4" />,
  },
  {
    label: "Order",
    value: "order",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
];

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        <Image
          alt="Product Image"
          className="max-h-15 w-auto rounded-lg"
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
        href={`/inventories/${row.getValue("id")}`}
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
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        {row.getValue("stock")}
      </div>
    ),
  },
  {
    accessorKey: "safetyStock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Safety Stock" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        {row.getValue("safetyStock")}
      </div>
    ),
  },
  {
    id: "stockStatus",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const stockStatus =
        (row.original?.stock as number) >= (row.original?.safetyStock as number)
          ? "In Stock"
          : "Shortage";

      return (
        <div className="min-w-max font-medium uppercase">
          <Badge
            className="rounded-md font-bold"
            variant={stockStatus === "Shortage" ? "destructive" : "default"}
          >
            {stockStatus}
          </Badge>
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
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formattedDate = format(date, "PP, HH:mm");
      return (
        <div className="line-clamp-1 min-w-max font-medium">
          {formattedDate}
        </div>
      );
    },
  },
];

export const inventoryHistoryColumns: ColumnDef<InventoryHistory>[] = [
  {
    accessorKey: "image",
    header: "Product",
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium uppercase">
        <Image
          alt="Product Image"
          className="max-h-15 w-auto rounded-lg object-cover"
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const inventoryId = row.original.inventoryId;
      return (
        <Link
          className={cn(
            "line-clamp-1 min-w-max font-medium",
            buttonVariants({ variant: "link", size: "sm" })
          )}
          href={inventoryId ? `/inventories/${inventoryId}` : "#"}
        >
          {row.getValue("name") || "Unknown Item"}
        </Link>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;

      // 1. Find the matching option to get the specific icon
      const option = inventoryCategoryOptions.find(
        (opt) => opt.value === category
      );

      // 2. Determine Badge Variant (Keep your existing logic)
      let variant: "default" | "destructive" | "secondary" | "outline" =
        "default";
      if (category === "waste") {
        variant = "destructive";
      }
      if (category === "restock") {
        variant = "secondary";
      }
      if (category === "adjustment") {
        variant = "outline";
      }

      return (
        <div className="min-w-max">
          <Badge className="rounded-md py-1.5 capitalize" variant={variant}>
            {/* 3. Render the Icon if found */}
            {option?.icon && (
              <span className="mr-1 flex items-center">{option.icon}</span>
            )}
            {category}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "change",
    header: "Change",
    cell: ({ row }) => {
      const amount = row.getValue("change") as number;
      const isPositive = amount > 0;

      return (
        <div
          className={cn(
            "min-w-max",
            isPositive && "text-green-600",
            !isPositive && "text-destructive"
          )}
        >
          {isPositive ? "+" : ""}
          {amount}
        </div>
      );
    },
  },
  {
    accessorKey: "stockRemaining",
    header: "Remaining",
    cell: ({ row }) => (
      <div className="min-w-max font-medium">
        {row.getValue("stockRemaining")}
      </div>
    ),
  },
  {
    accessorKey: "orderId",
    header: "Order Ref",
    cell: ({ row }) => {
      const orderId = row.getValue("orderId") as string | null;
      if (!orderId) {
        return <span className="text-center text-muted-foreground">-</span>;
      }

      return (
        <Link
          className={cn(buttonVariants({ variant: "link" }), "p-0 uppercase")}
          href={`/orders/${orderId}`}
        >
          {orderId}
        </Link>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <div className="line-clamp-1 min-w-max font-medium text-muted-foreground text-sm">
        {row.getValue("user") || "System"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
          {format(date, "PP, HH:mm")}
        </div>
      );
    },
  },
];
