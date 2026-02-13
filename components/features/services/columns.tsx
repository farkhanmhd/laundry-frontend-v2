"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { buttonVariants } from "@/components/ui/button";
import type { Service } from "@/lib/modules/services/data";
import { cn, formatToIDR } from "@/lib/utils";

export const useServiceColumns = (): ColumnDef<Service>[] => {
  const t = useTranslations("Services");

  return [
    {
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.image")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium uppercase">
          <Image
            alt="Product Image"
            className="max-h-[60px] rounded-lg"
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
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.lastUpdate")} />
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
