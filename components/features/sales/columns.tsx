"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/components/utils/client";
import type {
  BestSellerItem,
  SalesByOrder,
  SalesItemLog,
} from "@/lib/modules/sales/data";
import { formatDate, formatToIDR } from "@/lib/utils";

export const useBestSellersColumns = () => {
  const t = useTranslations("Sales");

  const bestSellersColumns: ColumnDef<BestSellerItem>[] = [
    {
      accessorKey: "itemName",
      header: t("columns.bestSellers.itemName"),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("itemName")}</span>
          <span className="font-mono text-muted-foreground text-xs uppercase">
            {row.original.id}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "itemType",
      header: t("columns.bestSellers.type"),
      cell: ({ row }) => {
        const type = row.getValue("itemType") as string;

        const variants: Record<
          string,
          "default" | "secondary" | "outline" | "destructive"
        > = {
          bundling: "default",
          service: "secondary",
          inventory: "outline",
        };

        const variant = variants[type] || "outline";

        return (
          <Badge className="capitalize" variant={variant}>
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "price",
      header: t("columns.bestSellers.unitPrice"),
      cell: ({ row }) => {
        const amount = formatToIDR(row.getValue("price"));
        return (
          <div className="text-muted-foreground text-sm">
            <Client>{amount}</Client>
          </div>
        );
      },
    },
    {
      accessorKey: "totalUnitsSold",
      header: t("columns.bestSellers.unitsSold"),
      cell: ({ row }) => (
        <div className="font-medium text-sm">
          {row.getValue("totalUnitsSold")}
        </div>
      ),
    },
    {
      accessorKey: "transactionCount",
      header: t("columns.bestSellers.orders"),
      cell: ({ row }) => (
        <div className="text-muted-foreground text-sm">
          {row.getValue("transactionCount")}
        </div>
      ),
    },
    {
      accessorKey: "totalRevenue",
      header: t("columns.bestSellers.totalRevenue"),
      cell: ({ row }) => {
        const amount = formatToIDR(row.getValue("totalRevenue"));
        return (
          <div className="font-medium text-accent-foreground">
            <Client>{amount}</Client>
          </div>
        );
      },
    },
  ];

  return bestSellersColumns;
};

export const useSalesByOrderColumns = () => {
  const t = useTranslations("Sales");

  const salesByOrderColumns: ColumnDef<SalesByOrder>[] = [
    {
      accessorKey: "id",
      header: t("columns.salesByOrder.orderId"),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Link
            className="font-mono text-primary text-sm uppercase"
            href={`/orders/${row.original.id}`}
          >
            {row.original.id}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "totalItems",
      header: t("columns.salesByOrder.items"),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("totalItems")}</div>
      ),
    },
    {
      accessorKey: "paymentType",
      header: t("columns.salesByOrder.payment"),
      cell: ({ row }) => {
        const paymentType = row.getValue("paymentType") as string;
        if (!paymentType) {
          return <span className="text-muted-foreground">-</span>;
        }
        return (
          <Badge
            className="capitalize"
            variant={paymentType === "qris" ? "default" : "secondary"}
          >
            {paymentType}
          </Badge>
        );
      },
    },
    {
      accessorKey: "itemsTotal",
      header: t("columns.salesByOrder.itemsTotal"),
      cell: ({ row }) => {
        const amount = formatToIDR(row.getValue("itemsTotal"));
        return (
          <div className="text-muted-foreground text-sm">
            <Client>{amount}</Client>
          </div>
        );
      },
    },
    {
      accessorKey: "discountAmount",
      header: t("columns.salesByOrder.discount"),
      cell: ({ row }) => {
        const amount = formatToIDR(row.getValue("discountAmount"));
        return (
          <div className="text-muted-foreground text-sm">
            <Client>{amount}</Client>
          </div>
        );
      },
    },
    {
      accessorKey: "total",
      header: t("columns.salesByOrder.total"),
      cell: ({ row }) => {
        const amount = formatToIDR(row.getValue("total"));
        return (
          <div className="font-medium text-accent-foreground">
            <Client>{amount}</Client>
          </div>
        );
      },
    },
    {
      accessorKey: "amountPaid",
      header: t("columns.salesByOrder.paid"),
      cell: ({ row }) => {
        const amount = formatToIDR(row.getValue("amountPaid"));
        return (
          <div className="text-muted-foreground text-sm">
            <Client>{amount}</Client>
          </div>
        );
      },
    },
    {
      accessorKey: "change",
      header: t("columns.salesByOrder.change"),
      cell: ({ row }) => {
        const value = row.getValue("change");
        if (value === null) {
          return <span className="text-muted-foreground">-</span>;
        }
        const amount = formatToIDR(value as number);
        return (
          <div className="text-muted-foreground text-sm">
            <Client>{amount}</Client>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: t("columns.salesByOrder.date"),
      cell: ({ row }) => {
        const date = formatDate(row.getValue("createdAt"));
        return (
          <div className="text-muted-foreground text-sm">
            <Client>{date}</Client>
          </div>
        );
      },
    },
  ];

  return salesByOrderColumns;
};

export const useSalesItemLogsColumns = () => {
  const t = useTranslations("Sales");

  const salesItemLogsColumns: ColumnDef<SalesItemLog>[] = [
    {
      accessorKey: "id",
      header: t("columns.salesItemLogs.orderItemId"),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <span className="uppercase">{row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: "orderId",
      header: t("columns.salesItemLogs.orderId"),
      cell: ({ row }) => (
        <Link
          className="font-mono text-primary text-sm uppercase"
          href={`/orders/${row.original.orderId}`}
        >
          {row.original.orderId}
        </Link>
      ),
    },
    {
      accessorKey: "itemName",
      header: t("columns.salesItemLogs.itemName"),
    },
    {
      accessorKey: "itemType",
      header: t("columns.salesItemLogs.type"),
      cell: ({ row }) => {
        const type = row.getValue("itemType") as string;
        const variants: Record<
          string,
          "default" | "secondary" | "outline" | "destructive"
        > = {
          bundling: "default",
          service: "secondary",
          inventory: "outline",
        };
        const variant = variants[type] || "outline";
        return (
          <Badge className="capitalize" variant={variant}>
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: t("columns.salesItemLogs.quantity"),
    },
    {
      accessorKey: "createdAt",
      header: t("columns.salesItemLogs.date"),
      cell: ({ row }) => {
        const date = formatDate(row.getValue("createdAt"));
        return (
          <div className="text-muted-foreground text-sm">
            <Client>{date}</Client>
          </div>
        );
      },
    },
  ];

  return salesItemLogsColumns;
};
