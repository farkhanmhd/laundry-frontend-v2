"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Delivery } from "./data";

export const usePickupsColumns = () => {
  const t = useTranslations("Pickups");

  const columns: ColumnDef<Delivery>[] = [
    {
      id: "select",
      cell: ({ row }) => {
        if (row.getValue("status") === "cancelled" || row.getValue("routeId")) {
          return null;
        }
        return (
          <Checkbox
            aria-label={t("table.selectRow")}
            checked={row.getIsSelected()}
            className="translate-y-0.5"
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "orderId",
      header: t("table.orderId"),
      cell: ({ row }) => (
        <Link
          className={cn(buttonVariants({ variant: "link" }), "pl-0 uppercase")}
          href={`/orders/${row.getValue("orderId")}`}
        >
          {row.getValue("orderId")}
        </Link>
      ),
    },
    {
      accessorKey: "customerName",
      header: t("table.customer"),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="max-w-37.5 truncate font-medium text-sm">
            {row.getValue("customerName")}
          </span>
          <span className="text-muted-foreground text-xs">
            {row.original.customerPhone}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: t("table.address"),
      cell: ({ row }) => (
        <div
          className="max-w-62.5 truncate text-sm"
          title={row.getValue("address")}
        >
          {row.getValue("address")}
        </div>
      ),
    },
    {
      accessorKey: "routeId",
      header: t("table.route"),
      cell: ({ row }) => {
        const routeId = row.getValue("routeId");
        if (!routeId) {
          return (
            <span className="text-muted-foreground text-sm italic">
              {t("table.unassigned")}
            </span>
          );
        }
        return (
          <Link
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "h-8 text-xs"
            )}
            href={`/routes/${row.getValue("routeId")}`}
          >
            {t("table.viewRoute")}
          </Link>
        );
      },
    },
    {
      accessorKey: "status",
      header: t("table.status"),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const getVariant = (s: string) => {
          switch (s) {
            case "requested":
              return "secondary";
            case "assigned":
              return "outline";
            case "in_progress":
              return "default";
            case "completed":
              return "outline";
            case "cancelled":
              return "destructive";
            default:
              return "secondary";
          }
        };

        return (
          <Badge
            className="whitespace-nowrap rounded-md font-semibold uppercase"
            variant={getVariant(status)}
          >
            {status.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "requestedAt",
      header: t("table.requestTime"),
      cell: ({ row }) => {
        const date = new Date(row.getValue("requestedAt"));
        return (
          <div className="text-muted-foreground text-sm">
            {date.toLocaleDateString("en-ID", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        );
      },
    },
  ];

  return columns;
};
