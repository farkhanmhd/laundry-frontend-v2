"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { enUS, id } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Delivery } from "@/lib/modules/deliveries/data";
import { cn } from "@/lib/utils";

const dateRegex = /[+-]\d\d$/;

export const useDeliveryColumns = () => {
  const t = useTranslations("Deliveries.table");
  const locale = useLocale();
  const dateLocale = locale === "id" ? id : enUS;

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
      accessorKey: "driverName",
      header: t("driver"),
      cell: ({ row }) => {
        const name = row.getValue("driverName") as string | null;
        return (
          <div className="text-sm">
            {name ?? <span className="text-muted-foreground italic">-</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "vehicleName",
      header: t("vehicle"),
      cell: ({ row }) => {
        const name = row.getValue("vehicleName") as string | null;
        return (
          <div className="text-sm">
            {name ?? <span className="text-muted-foreground italic">-</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "licensePlate",
      header: t("licensePlate"),
      cell: ({ row }) => {
        const plate = row.getValue("licensePlate") as string | null;
        return (
          <div className="text-sm uppercase">
            {plate ?? <span className="text-muted-foreground italic">-</span>}
          </div>
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
      accessorKey: "requestTime",
      header: t("requestTime"),
      cell: ({ row }) => {
        const value = row.getValue<string | null>("requestTime");
        if (!value) {
          return <span className="text-muted-foreground text-sm">-</span>;
        }
        const date = new Date(value.replace(dateRegex, "$&:00"));
        console.log({ date, value });
        if (Number.isNaN(date.getTime())) {
          return <span className="text-muted-foreground text-sm">-</span>;
        }
        return (
          <div className="text-sm">
            {formatInTimeZone(date, "UTC", "EEEE, dd MMMM yyyy, HH:mm", {
              locale: dateLocale,
            })}
          </div>
        );
      },
    },
  ];

  return columns;
};
