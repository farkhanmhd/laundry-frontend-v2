"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { buttonVariants } from "@/components/ui/button";
import type { Asset } from "@/lib/modules/assets/data";
import { cn } from "@/lib/utils";
import { DeleteAssetDialog } from "./delete-asset-dialog";

export const useAssetColumns = (): ColumnDef<Asset>[] => {
  const t = useTranslations("Assets");

  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.name")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "licensePlate",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("table.licensePlate")}
        />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium uppercase">
          {row.getValue("licensePlate")}
        </div>
      ),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.actions")} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" })
            )}
            href={`/assets/${row.original.id}`}
          >
            <Eye />
          </Link>
          <DeleteAssetDialog id={row.original.id} />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
