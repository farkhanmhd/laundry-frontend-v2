"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { buttonVariants } from "@/components/ui/button";
import type { Vehicle } from "@/lib/modules/vehicles/data";
import { cn } from "@/lib/utils";
import { DeleteVehicleDialog } from "./delete-vehicle-dialog";

export const useVehicleColumns = (): ColumnDef<Vehicle>[] => {
  const t = useTranslations("Vehicles");

  return [
    {
      accessorKey: "name",
      header: t("table.name"),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "licensePlate",
      header: t("table.licensePlate"),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium uppercase">
          {row.getValue("licensePlate")}
        </div>
      ),
    },
    {
      accessorKey: "ownerName",
      header: t("table.ownerName"),
      cell: ({ row }) => {
        const ownerName = row.original.ownerName ?? t("table.business");
        return (
          <div className="line-clamp-1 min-w-max font-medium">{ownerName}</div>
        );
      },
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
            href={`/vehicles/${row.original.id}`}
          >
            <Eye />
          </Link>
          <DeleteVehicleDialog id={row.original.id} />
        </div>
      ),
    },
  ];
};
