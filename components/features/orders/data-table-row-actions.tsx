"use client";

import type { Row } from "@tanstack/react-table";
import { CheckCircle2, MoreHorizontal, Package } from "lucide-react";
import { toast } from "sonner";
import type { Order } from "@/app/(protected)/admin/orders/columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // We cast the data to our Order type to access specific fields
  const order = row.original as Order;

  const handleStatusUpdate = (newStatus: Order["status"]) => {
    // Mock API Call
    toast.success("Order Updated", {
      description: `Order ${order.id} updated to ${newStatus}.`,
    });
    console.log(`Update order ${order.id} to ${newStatus}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          variant="ghost"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-muted-foreground text-sm">
          Actions
        </DropdownMenuLabel>

        {/* General Actions available for all orders */}
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(order.id)}
        >
          Copy Order ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("View details", order.id)}>
          View Details
        </DropdownMenuItem>

        {order.status !== "completed" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-muted-foreground text-sm">
              Change Status
            </DropdownMenuLabel>
          </>
        )}

        {/* Logic: If Processing, next step is Ready */}
        {order.status === "processing" && (
          <DropdownMenuItem onClick={() => handleStatusUpdate("ready")}>
            <Package className="mr-2 h-4 w-4" />
            Mark as Ready
          </DropdownMenuItem>
        )}

        {/* Logic: If Ready, next step is Completed */}
        {order.status === "ready" && (
          <DropdownMenuItem onClick={() => handleStatusUpdate("completed")}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark Completed
          </DropdownMenuItem>
        )}

        {/* Logic: Pending usually waits for system, but maybe admin can Cancel */}
        {order.status === "pending" && (
          <DropdownMenuItem
            disabled
            onClick={() => toast.error("Cannot manually update pending orders")}
          >
            <span className="opacity-50">Waiting for Payment...</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
