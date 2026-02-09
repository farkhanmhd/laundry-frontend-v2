"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/components/utils/client";
import type { BestSellerItem, SalesByOrder } from "@/lib/modules/sales/data";
import { formatDate, formatToIDR } from "@/lib/utils";

export const bestSellersColumns: ColumnDef<BestSellerItem>[] = [
  {
    accessorKey: "itemName",
    header: "Item Name",
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
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("itemType") as string;

      // Map types to Shadcn Badge variants for visual distinction
      const variants: Record<
        string,
        "default" | "secondary" | "outline" | "destructive"
      > = {
        bundling: "default", // High value/Packages -> Solid Primary
        service: "secondary", // Core offering -> Solid Secondary
        inventory: "outline", // Products -> Outline
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
    header: "Unit Price",
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
    header: "Units Sold",
    cell: ({ row }) => (
      <div className="font-medium text-sm">
        {row.getValue("totalUnitsSold")}
      </div>
    ),
  },
  {
    accessorKey: "transactionCount",
    header: "Orders",
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.getValue("transactionCount")}
      </div>
    ),
  },
  {
    accessorKey: "totalRevenue",
    header: "Total Revenue",
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

export const salesByOrderColumns: ColumnDef<SalesByOrder>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
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
    header: "Items",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("totalItems")}</div>
    ),
  },
  {
    accessorKey: "paymentType",
    header: "Payment",
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
    header: "Items Total",
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
    header: "Discount",
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
    header: "Total",
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
    header: "Paid",
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
    header: "Change",
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
    header: "Date",
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
