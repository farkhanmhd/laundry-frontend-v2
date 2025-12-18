import { Package } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Client } from "@/components/utils/client";
import {
  cardShadowStyle,
  cn,
  formatDate,
  formatToIDR,
  getStatusColor,
} from "@/lib/utils";

type Props = {
  order: {
    id: string;
    status: string;
    total: number;
    createdAt: string;
  };
  shadow?: boolean;
};

export function OrderItem({ order, shadow = false }: Props) {
  return (
    <div
      className="flex flex-col gap-3 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between"
      style={shadow ? cardShadowStyle : {}}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "rounded-full"
          )}
        >
          <Package className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 sm:justify-start">
            <p className="font-semibold uppercase">Order {order.id}</p>
            <Badge variant={getStatusColor(order.status)}>
              {order.status.toUpperCase()}
            </Badge>
          </div>
          <Client>
            <p className="mt-1 text-muted-foreground text-sm">
              {formatDate(order.createdAt)}
            </p>
          </Client>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
        <p className="font-bold text-base">{formatToIDR(order.total)}</p>

        <div className="flex gap-3">
          <Link
            className={cn(buttonVariants({ variant: "secondary" }))}
            href={`/customer-orders/${order.id}`}
          >
            Details
          </Link>
          {order.status === "pending" && <Button size="sm">Pay Now</Button>}
        </div>
      </div>
    </div>
  );
}
