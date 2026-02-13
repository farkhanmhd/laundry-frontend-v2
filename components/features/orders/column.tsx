"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Client } from "@/components/utils/client";
import type { Order } from "@/lib/modules/orders/data";
import { cn, formatToIDR } from "@/lib/utils";

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: () => {
      const t = useTranslations("Orders.table");
      return t("orderId");
    },
    cell: ({ row }) => (
      <Link
        className={cn(buttonVariants({ variant: "link" }), "uppercase")}
        href={`/orders/${row.getValue("id")}`}
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "customerName",
    header: () => {
      const t = useTranslations("Orders.table");
      return t("customer");
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => {
      const t = useTranslations("Orders.table");
      return t("phone");
    },
    cell: ({ row }) => {
      const phone: string = row.getValue("phone") ? row.getValue("phone") : "-";

      return <div className="text-sm capitalize">{phone}</div>;
    },
  },
  {
    accessorKey: "totalItems",
    header: () => {
      const t = useTranslations("Orders.table");
      return t("totalItems");
    },
    cell: ({ row }) => {
      const t = useTranslations("Orders.table");
      return (
        <div className="text-sm">
          {row.getValue("totalItems")} {t("items")}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => {
      const t = useTranslations("Orders.table");
      return t("total");
    },
    cell: ({ row }) => {
      const amount = formatToIDR(row.getValue("total"));
      return (
        <div className="font-medium">
          <Client>{amount}</Client>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {
      const t = useTranslations("Orders.table");
      return t("status");
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants = {
        pending: "destructive",
        processing: "outline",
        ready: "secondary",
        completed: "default",
      } as const;

      const variant = variants[status as keyof typeof variants] || "secondary";

      return (
        <Badge className="capitalize" variant={variant}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      const t = useTranslations("Orders.table");
      return t("date");
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string);
      return <div className="text-sm">{date.toLocaleDateString("id-ID")}</div>;
    },
  },
];
