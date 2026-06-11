"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import type { Route } from "@/lib/modules/routes/data";
import { cn } from "@/lib/utils";

export const useRouteColumns = (): ColumnDef<Route>[] => {
  const t = useTranslations("Routes");

  return [
    {
      accessorKey: "id",
      header: t("table.id"),
      cell: ({ row }) => (
        <Link
          className={cn(
            buttonVariants({ variant: "link", size: "sm" }),
            "line-clamp-1 min-w-max font-medium uppercase"
          )}
          href={`/routes/${row.getValue("id")}`}
        >
          {row.getValue("id")}
        </Link>
      ),
    },
    {
      accessorKey: "driverName",
      header: t("table.driver"),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {row.getValue("driverName") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "assetName",
      header: t("table.asset"),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max">
          {row.getValue("assetName") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "assetLicensePlate",
      header: t("table.licensePlate"),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max">
          {row.getValue("assetLicensePlate") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "deliveryCount",
      header: t("table.deliveries"),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium tabular-nums">
          {row.getValue("deliveryCount")}
        </div>
      ),
    },
    {
      accessorKey: "completedCount",
      header: t("table.completed"),
      cell: ({ row }) => {
        const completed = Number(row.getValue("completedCount"));
        const total = Number(row.original.deliveryCount);
        return (
          <div className="flex min-w-max items-center gap-2 tabular-nums">
            <div className="flex h-2 w-20 overflow-hidden rounded-full bg-primary/20">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${total > 0 ? (completed / total) * 100 : 0}%`,
                }}
              />
            </div>
            <span className="text-muted-foreground text-sm">
              {completed}/{total}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: t("table.actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" })
            )}
            href={`/routes/${row.original.id}`}
          >
            <Eye />
          </Link>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
