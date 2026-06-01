"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { buttonVariants } from "@/components/ui/button";
import { useUserRole } from "@/hooks/use-user-role";
import type { Service } from "@/lib/modules/services/data";
import { cn, formatToIDR } from "@/lib/utils";
import { DeleteServiceDialog } from "./delete-service-dialog";

export const useServiceColumns = (): ColumnDef<Service>[] => {
  const t = useTranslations("Services");
  const role = useUserRole();

  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.image")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium uppercase">
          <Image
            alt={t("table.image")}
            className="max-h-15 rounded-lg"
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
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.price")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {formatToIDR(row.getValue("price"))}
        </div>
      ),
    },
  ];

  if (role === "superadmin") {
    const idColumn: ColumnDef<Service> = {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.id")} />
      ),
      cell: ({ row }) => (
        <Link
          className={cn(
            "line-clamp-1 min-w-max font-medium uppercase",
            buttonVariants({ variant: "link", size: "sm" }),
            "text-sidebar-ring"
          )}
          href={`/services/${row.getValue("id")}`}
        >
          {row.getValue("id")}
        </Link>
      ),
    };

    columns.splice(1, 0, idColumn);

    const actionColumn: ColumnDef<Service> = {
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
            href={`/services/${row.original.id}`}
          >
            <Eye />
          </Link>
          {!row.original.isOnBundling && (
            <DeleteServiceDialog id={row.original.id} />
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
