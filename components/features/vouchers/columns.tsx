"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Client } from "@/components/utils/client";
import type { Voucher } from "@/lib/modules/vouchers/data";
import { cn, formatToIDR } from "@/lib/utils";

export const useVoucherColumns = (): ColumnDef<Voucher>[] => {
  const t = useTranslations("Vouchers");

  return [
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
          href={`/vouchers/${row.getValue("id")}`}
        >
          {row.getValue("id")}
        </Link>
      ),
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.code")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium uppercase">
          {row.getValue("code")}
        </div>
      ),
    },
    {
      accessorKey: "discountPercentage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.percentage")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {Number(row.getValue("discountPercentage")) > 0
            ? `${row.getValue("discountPercentage")} %`
            : "-"}
        </div>
      ),
    },
    {
      accessorKey: "discountAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.discount")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          {Number(row.getValue("discountAmount")) > 0
            ? formatToIDR(row.getValue("discountAmount"))
            : "-"}
        </div>
      ),
    },
    {
      accessorKey: "minSpend",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.minSpend")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          <Client>{formatToIDR(row.getValue("minSpend"))}</Client>
        </div>
      ),
    },
    {
      accessorKey: "maxDiscountAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.maxDiscount")} />
      ),
      cell: ({ row }) => (
        <div className="line-clamp-1 min-w-max font-medium">
          <Client>{formatToIDR(row.getValue("maxDiscountAmount"))}</Client>
        </div>
      ),
    },
    {
      accessorKey: "expiresAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("table.expiry")} />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("expiresAt"));
        const formattedDate = format(date, "PP, HH:mm");
        return (
          <div className="line-clamp-1 min-w-max font-medium">
            {formattedDate}
          </div>
        );
      },
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
      accessorKey: "isVisible",
      header: () => <div>{t("table.visibility")}</div>,
      cell: ({ row }) => {
        const active = row.original.isVisible;
        return (
          <div className="min-w-max font-medium uppercase">
            <Badge
              className="font-bold"
              variant={active ? "default" : "outline"}
            >
              {active ? t("form.visible") : t("form.hidden")}
            </Badge>
          </div>
        );
      },
    },
  ];
};
