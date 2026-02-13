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
import { useTranslations } from "next-intl";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type {
  Inventory,
  InventoryHistory,
} from "@/lib/modules/inventories/data";
import { cn, formatToIDR, type SelectOption } from "@/lib/utils";

const useInventoryTranslations = () => {
  const t = useTranslations("Inventories");
  return {
    table: {
      image: t("table.image"),
      id: t("table.id"),
      name: t("table.name"),
      price: t("table.price"),
      quantity: t("table.quantity"),
      safetyStock: t("table.safetyStock"),
      status: t("table.status"),
      dateAdded: t("table.dateAdded"),
      lastUpdate: t("table.lastUpdate"),
      inStock: t("table.inStock"),
      shortage: t("table.shortage"),
      unknown: t("table.unknown"),
    },
    categories: {
      waste: t("categories.waste"),
      adjustment: t("categories.adjustment"),
      restock: t("categories.restock"),
      order: t("categories.order"),
    },
    logs: {
      product: t("logs.product"),
      category: t("logs.category"),
      change: t("logs.change"),
      remaining: t("logs.remaining"),
      orderRef: t("logs.orderRef"),
      user: t("logs.user"),
      time: t("logs.time"),
    },
  };
};

export const useInventoryColumns = (): ColumnDef<Inventory>[] => {
  const t = useInventoryTranslations();

  return [
    {
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t.table.image} />
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
        <DataTableColumnHeader column={column} title={t.table.id} />
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
        <DataTableColumnHeader column={column} title={t.table.name} />
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
        <DataTableColumnHeader column={column} title={t.table.price} />
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
        <DataTableColumnHeader column={column} title={t.table.quantity} />
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
        <DataTableColumnHeader column={column} title={t.table.safetyStock} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium uppercase">
          {row.getValue("safetyStock")}
        </div>
      ),
    },
    {
      id: "stockStatus",
      header: () => <div>{t.table.status}</div>,
      cell: ({ row }) => {
        const stockStatus =
          (row.original?.stock as number) >=
          (row.original?.safetyStock as number)
            ? t.table.inStock
            : t.table.shortage;

        return (
          <div className="min-w-max font-medium uppercase">
            <Badge
              className="rounded-md font-bold"
              variant={
                stockStatus === t.table.shortage ? "destructive" : "default"
              }
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
        <DataTableColumnHeader column={column} title={t.table.dateAdded} />
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
        <DataTableColumnHeader column={column} title={t.table.lastUpdate} />
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
};

export const useInventoryCategoryOptions = (): SelectOption[] => {
  const t = useTranslations("Inventories");
  return [
    {
      label: t("categories.waste"),
      value: "waste",
      icon: <Trash2 className="h-4 w-4" />,
    },
    {
      label: t("categories.adjustment"),
      value: "adjustment",
      icon: <SlidersHorizontal className="h-4 w-4" />,
    },
    {
      label: t("categories.restock"),
      value: "restock",
      icon: <PackagePlus className="h-4 w-4" />,
    },
    {
      label: t("categories.order"),
      value: "order",
      icon: <ShoppingCart className="h-4 w-4" />,
    },
  ];
};

export const useInventoryHistoryColumns = (): ColumnDef<InventoryHistory>[] => {
  const t = useInventoryTranslations();
  const categoryOptions = useInventoryCategoryOptions();

  return [
    {
      accessorKey: "image",
      header: t.logs.product,
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
      header: t.table.name,
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
            {row.getValue("name") || t.table.unknown}
          </Link>
        );
      },
    },
    {
      accessorKey: "category",
      header: t.logs.category,
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        const option = categoryOptions.find((opt) => opt.value === category);

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
              {option?.icon && (
                <span className="mr-1 flex items-center">{option.icon}</span>
              )}
              {category}
            </Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "change",
      header: t.logs.change,
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
      header: t.logs.remaining,
      cell: ({ row }) => (
        <div className="min-w-max font-medium">
          {row.getValue("stockRemaining")}
        </div>
      ),
    },
    {
      accessorKey: "orderId",
      header: t.logs.orderRef,
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
      header: t.logs.user,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
          {row.getValue("user") || "System"}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t.logs.time,
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
};
