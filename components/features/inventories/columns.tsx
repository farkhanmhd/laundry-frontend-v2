"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  PackagePlus,
  ShoppingCart,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useUserData } from "@/hooks/use-user-data";
import type {
  AdjustmentHistory,
  Inventory,
  MovementHistory,
  RestockHistory,
  UsageHistory,
} from "@/lib/modules/inventories/data";
import { cn, formatDate, formatToIDR, type SelectOption } from "@/lib/utils";
import { DeleteAdjustment } from "./delete-adjustment";
import { DeleteInventoryDialog } from "./delete-inventory-dialog";
import { DeleteRestock } from "./delete-restock";
import { UpdateAdjustmentDialog } from "./update-adjustment-dialog";
import { UpdateRestockDialog } from "./update-restock-dialog";

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
      actions: t("table.actions"),
      unit: t("table.unit"),
    },
    categories: {
      waste: t("categories.waste"),
      adjustment: t("categories.adjustment"),
      restock: t("categories.restock"),
      order: t("categories.order"),
      usage: t("categories.usage"),
    },
    logs: {
      product: t("logs.product"),
      category: t("logs.category"),
      change: t("logs.change"),
      remaining: t("logs.remaining"),
      restockPrice: t("logs.restockPrice"),
      orderRef: t("logs.orderRef"),
      user: t("logs.user"),
      inputTime: t("logs.inputTime"),
      time: t("logs.time"),
      createdAt: t("logs.createdAt"),
      supplier: t("logs.supplier"),
      note: t("logs.note"),
      type: t("logs.type"),
      reference: t("logs.reference"),
      previous: t("logs.previous"),
    },
  };
};

export const useInventoryColumns = (): ColumnDef<Inventory>[] => {
  const t = useInventoryTranslations();

  const userData = useUserData();

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
      accessorKey: "unit",
      header: t.table.unit,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {row.getValue("unit")}
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
        return (
          <div className="line-clamp-1 min-w-max font-medium">
            {formatDate(row.original.createdAt as string)}
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: t.table.lastUpdate,
      cell: ({ row }) => {
        return (
          <div className="line-clamp-1 min-w-max font-medium">
            {formatDate(row.original.updatedAt as string)}
          </div>
        );
      },
    },
  ];

  if (userData?.role === "superadmin") {
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

    const actionColumn: ColumnDef<Inventory> = {
      accessorKey: "actions",
      header: t.table.actions,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" })
            )}
            href={`/inventories/${row.original.id}`}
          >
            <Eye />
          </Link>
          {!row.original.isOnBundling && (
            <DeleteInventoryDialog id={row.original.id} />
          )}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    };

    columns.push(actionColumn);
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
        header: t.logs.createdAt,
        cell: ({ row }) => {
          return (
            <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
              {formatDate(row.getValue("createdAt") as string)}
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
        header: t.logs.createdAt,
        cell: ({ row }) => {
          return (
            <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
              {formatDate(row.getValue("createdAt") as string)}
            </div>
          );
        },
      },
    ];
  };

export const useMovementHistoryColumns = (): ColumnDef<MovementHistory>[] => {
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
      accessorKey: "type",
      header: t.logs.type,
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        const variantMap: Record<string, string> = {
          restock: "default",
          waste: "destructive",
          adjustment: "secondary",
        };
        const labelMap: Record<string, string> = {
          restock: t.categories.restock,
          waste: t.categories.waste,
          adjustment: t.categories.adjustment,
          order: t.categories.order,
          usage: t.categories.usage,
        };
        const variant = variantMap[type] ?? "secondary";
        const label = labelMap[type] ?? type;
        return (
          <Badge
            className="rounded-md uppercase"
            variant={variant as keyof typeof badgeVariants}
          >
            {label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "previousStock",
      header: t.logs.previous,
      cell: ({ row }) => (
        <div className="min-w-max font-medium">
          {row.getValue("previousStock") as number}
        </div>
      ),
    },
    {
      accessorKey: "changeAmount",
      header: t.logs.change,
      cell: ({ row }) => {
        const amount = row.getValue("changeAmount") as number;
        const isPositive = amount > 0;
        return (
          <div
            className={cn(
              "min-w-max font-medium",
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
          {row.getValue("stockRemaining") as number}
        </div>
      ),
    },
    {
      accessorKey: "reference",
      header: t.logs.reference,
      cell: ({ row }) => {
        const reference = row.getValue("reference") as string | null;
        if (!reference) {
          return <span className="text-muted-foreground">-</span>;
        }
        const isOrderRef = reference.startsWith("o-");
        if (isOrderRef) {
          return (
            <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "p-0 uppercase"
              )}
              href={`/orders/${reference}`}
            >
              {reference}
            </Link>
          );
        }
        return (
          <div className="min-w-max text-muted-foreground">{reference}</div>
        );
      },
      enableSorting: false,
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
      accessorKey: "actorName",
      header: t.logs.user,
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
          {(row.getValue("actorName") as string) || "System"}
        </div>
      ),
    },
    {
      accessorKey: "inputTime",
      header: t.logs.inputTime,
      cell: ({ row }) => {
        return (
          <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
            {formatDate(row.getValue("inputTime") as string)}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: t.logs.createdAt,
      cell: ({ row }) => {
        return (
          <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
            {formatDate(row.getValue("createdAt") as string)}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const rowType = row.getValue("type");
        const isLatest = row.original.isLatest;
        const canModify =
          isLatest && (rowType === "restock" || rowType === "adjustment");

        if (canModify) {
          return (
            <div className="flex gap-2">
              {rowType === "adjustment" && (
                <>
                  <UpdateAdjustmentDialog
                    changeAmount={row.original.changeAmount}
                    id={row.original.id}
                    note={row.original.note ?? ""}
                  />
                  <DeleteAdjustment id={row.original.id} />
                </>
              )}
              {rowType === "restock" && (
                <>
                  <UpdateRestockDialog
                    id={row.original.id}
                    note={row.original.note ?? ""}
                    restockQuantity={row.original.changeAmount}
                  />
                  <DeleteRestock id={row.original.id} />
                </>
              )}
            </div>
          );
        }

        return null;
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
      accessorKey: "restockPrice",
      header: t.logs.restockPrice,
      cell: ({ row }) => (
        <div className="min-w-max font-medium">
          {row.getValue("restockPrice") ?? 0}
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
      header: t.logs.createdAt,
      cell: ({ row }) => {
        return (
          <div className="line-clamp-1 min-w-max text-muted-foreground text-sm">
            {formatDate(row.getValue("restockTime") as string)}
          </div>
        );
      },
    },
  ];
};
