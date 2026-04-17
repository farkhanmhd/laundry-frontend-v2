"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { buttonVariants } from "@/components/ui/button";
import { useUserRole } from "@/hooks/use-user-role";
import type { Bundling } from "@/lib/modules/bundlings/data";
import { cn, formatToIDR } from "@/lib/utils";

export const useBundlingColumns = (): ColumnDef<Bundling>[] => {
  const t = useTranslations("Bundlings");
  const role = useUserRole();

  const idColumn: ColumnDef<Bundling> = {
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
        href={`/bundlings/${row.getValue("id")}`}
      >
        {row.getValue("id")}
      </Link>
    ),
  };

  const columns: ColumnDef<Bundling>[] = [
    {
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.image")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium uppercase">
          <Image
            alt={t("table.image")}
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
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.dateAdded")} />
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
  ];

  if (role === "superadmin") {
    columns.splice(1, 0, idColumn);
  }

  return columns;
};
