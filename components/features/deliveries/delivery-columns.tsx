"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Delivery } from "@/lib/modules/deliveries/data";
import { cn } from "@/lib/utils";

export const useDeliveryColumns = () => {
  const t = useTranslations("Deliveries.table");

  const columns: ColumnDef<Delivery>[] = [
    {
      id: "select",
      cell: ({ row }) => {
        if (row.original.status === "cancelled" || row.original.routeId) {
          return null;
        }
        return (
          <Checkbox
            aria-label={t("selectRow")}
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
      header: t("orderId"),
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
      header: t("customer"),
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
      header: t("address"),
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
      header: t("route"),
      cell: ({ row }) => {
        const routeId = row.getValue("routeId");
        if (!routeId) {
          return (
            <span className="text-muted-foreground text-sm italic">
              {t("unassigned")}
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
            {t("viewRoute")}
          </Link>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const getVariant = (s: string) => {
          switch (s) {
            case "requested":
              return "outline";
            case "assigned":
              return "secondary";
            case "in_progress":
              return "secondary";
            case "completed":
              return "default";
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
      header: t("requestTime"),
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
