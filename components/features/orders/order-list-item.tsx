import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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

export function OrderListItem({ order, shadow = false }: Props) {
  return (
    <div
      className="space-y-3 rounded-md border p-3"
      style={shadow ? cardShadowStyle : {}}
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold uppercase">Order {order.id}</p>
          <Badge
            className="font-semibold"
            variant={getStatusColor(order.status)}
          >
            {order.status.toUpperCase()}
          </Badge>
        </div>
        <Client>
          <p className="mt-1 text-muted-foreground text-sm">
            {formatDate(order.createdAt)}
          </p>
        </Client>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-bold">{formatToIDR(order.total)}</p>
        <div className="flex items-center justify-between gap-2">
          <Link
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
            href={`/customer-orders/${order.id}`}
          >
            Details
          </Link>
          {order.status === "pending" && (
            <Link
              className={cn(buttonVariants({ size: "sm" }))}
              href={`/customer-orders/${order.id}/payment`}
            >
              Pay Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
