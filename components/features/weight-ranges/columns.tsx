"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useUserData } from "@/hooks/use-user-data";
import type { WeightRange } from "@/lib/modules/weight-ranges/data";
import { cn, formatDate } from "@/lib/utils";

export const useWeightRangeColumns = (): ColumnDef<WeightRange>[] => {
  const t = useTranslations("WeightRanges");
  const userData = useUserData();

  const columns: ColumnDef<WeightRange>[] = [
    {
      accessorKey: "label",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.label")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {row.getValue("label")}
        </div>
      ),
    },
    {
      accessorKey: "minWeight",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.minWeight")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max">
          {row.getValue("minWeight")}
        </div>
      ),
    },
    {
      accessorKey: "maxWeight",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.maxWeight")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max">
          {row.getValue("maxWeight")}
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.isActive")} />
      ),
      cell: ({ row }) => {
        const isActive = row.getValue("isActive");
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? t("table.active") : t("table.inactive")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.createdAt")} />
      ),
      cell: ({ row }) => {
        return <div>{formatDate(row.getValue("createdAt"))}</div>;
      },
    },
  ];

  if (userData?.role === "superadmin") {
    columns.push({
      accessorKey: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.actions")} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" })
            )}
            href={`/weight-ranges/${row.original.id}`}
          >
            <Eye />
          </Link>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  return columns;
};
