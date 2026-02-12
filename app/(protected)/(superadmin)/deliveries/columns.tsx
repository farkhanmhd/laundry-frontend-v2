"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Delivery } from "./data";

export const deliveriesColumns: ColumnDef<Delivery>[] = [
  // 1. Select Checkbox (Crucial for Batching/Routing)
  {
    id: "select",
    cell: ({ row }) => {
      if (row.getValue("status") === "cancelled" || row.getValue("routeId")) {
        return null;
      }
      return (
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          className="translate-y-0.5"
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  // 3. Order ID Reference
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <Link
        className={cn(buttonVariants({ variant: "link" }), "pl-0 uppercase")}
        href={`/orders/${row.getValue("orderId")}`}
      >
        {row.getValue("orderId")}
      </Link>
    ),
  },

  // 4. Type (Pickup/Dropoff)

  // 5. Customer (Name + Phone)
  {
    accessorKey: "customerName",
    header: "Customer",
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

  // 6. Address
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div
        className="max-w-62.5 truncate text-sm"
        title={row.getValue("address")}
      >
        {row.getValue("address")}
      </div>
    ),
  },

  // 7. Route ID (Assignment Status)
  {
    accessorKey: "routeId",
    header: "Route",
    cell: ({ row }) => {
      const routeId = row.getValue("routeId");
      if (!routeId) {
        return (
          <span className="text-muted-foreground text-sm italic">
            Unassigned
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
          View Route
        </Link>
      );
    },
  },

  // 8. Status
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const getVariant = (s: string) => {
        switch (s) {
          case "requested":
            return "secondary"; // Gray
          case "assigned":
            return "outline"; // White/Border
          case "in_progress":
            return "default"; // Blue/Primary
          case "completed":
            return "outline"; // Needs custom class for green usually, outline is safe fallback
          case "cancelled":
            return "destructive"; // Red
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

  // 9. Requested At
  {
    accessorKey: "requestedAt",
    header: "Request Time",
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
