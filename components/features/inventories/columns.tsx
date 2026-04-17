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
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useUserRole } from "@/hooks/use-user-role";
import type {
  AdjustmentHistory,
  Inventory,
  RestockHistory,
  UsageHistory,
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
      supplier: t("logs.supplier"),
      note: t("logs.note"),
    },
  };
};

export const useInventoryColumns = (): ColumnDef<Inventory>[] => {
  const t = useInventoryTranslations();

  const role = useUserRole();

  const columns: ColumnDef<Inventory>[] = [
    {
      accessorKey: "image",
      header: t.table.image,
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
      accessorKey: "name",
      header: t.table.name,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: t.table.price,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {formatToIDR(row.getValue("price"))}
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: t.table.quantity,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium uppercase">
          {row.getValue("stock")}
        </div>
      ),
    },
    {
      accessorKey: "safetyStock",
      header: t.table.safetyStock,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium uppercase">
          {row.getValue("safetyStock")}
        </div>
      ),
    },
    {
      id: "stockStatus",
      header: t.table.status,
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
      header: t.table.dateAdded,
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
      header: t.table.lastUpdate,
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

  if (role === "superadmin") {
    const idColumn: ColumnDef<Inventory> = {
      accessorKey: "id",
      header: t.table.id,
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
    };

    columns.splice(1, 0, idColumn);
  }

  return columns;
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

export const useAdjustmentHistoryColumns =
  (): ColumnDef<AdjustmentHistory>[] => {
    const t = useInventoryTranslations();

    return [
      {
        accessorKey: "name",
        header: t.logs.product,
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
        accessorKey: "note",
        header: t.logs.note,
        cell: ({ row }) => (
          <div className="min-w-max font-medium">{row.getValue("note")}</div>
        ),
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

export const useInventoryUsageHistoryColumns =
  (): ColumnDef<UsageHistory>[] => {
    const t = useInventoryTranslations();

    return [
      {
        accessorKey: "name",
        header: t.logs.product,
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
        accessorKey: "change",
        header: t.logs.change,
        cell: ({ row }) => {
          const amount = row.getValue("change") as number;
          const isPositive = amount > 0;
          return (
            <div className={cn("min-w-max", !isPositive && "text-destructive")}>
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
              className={cn(
                buttonVariants({ variant: "link" }),
                "p-0 uppercase"
              )}
              href={`/orders/${orderId}`}
            >
              {orderId}
            </Link>
          );
        },
        enableSorting: false,
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

export const useRestockHistoryColumns = (): ColumnDef<RestockHistory>[] => {
  const t = useInventoryTranslations();

  return [
    {
      accessorKey: "inventoryName",
      header: t.logs.product,
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
            {row.getValue("inventoryName") || t.table.unknown}
          </Link>
        );
      },
    },
    {
      accessorKey: "restockQuantity",
      header: t.categories.restock,
      cell: ({ row }) => (
        <div className="min-w-max font-medium text-green-600">
          +{row.getValue("restockQuantity") as number}
        </div>
      ),
    },
    {
      accessorKey: "stockRemaining",
      header: t.logs.remaining,
      cell: ({ row }) => (
        <div className="min-w-max font-medium">
          {row.getValue("stockRemaining") as number}
        </div>
      ),
    },
    {
      accessorKey: "note",
      header: t.logs.note,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
          {(row.getValue("note") as string) || "-"}
        </div>
      ),
    },
    {
      accessorKey: "supplier",
      header: t.logs.supplier,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
          {(row.getValue("supplier") as string) || "-"}
        </div>
      ),
    },
    {
      accessorKey: "actorName",
      header: t.logs.user,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
          {(row.getValue("actorName") as string) || "System"}
        </div>
      ),
    },
    {
      accessorKey: "restockTime",
      header: t.logs.time,
      cell: ({ row }) => {
        const dateValue = row.getValue("restockTime") as string | Date;
        const date = new Date(dateValue);

        return (
          <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
            {format(date, "PP, HH:mm")}
          </div>
        );
      },
    },
  ];
};
