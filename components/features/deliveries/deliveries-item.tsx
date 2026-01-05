import { Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Client } from "@/components/utils/client";
import { cardShadowStyle, cn, formatDate, getStatusColor } from "@/lib/utils";

type Props = {
  delivery: {
    id: string;
    orderId: string;
    type: string;
    status: string;
    address: string;
    date: string;
  };
  shadow?: boolean;
};
export function DeliveriesItem({ delivery, shadow = false }: Props) {
  return (
    <div
      className="grid gap-3 rounded-lg border p-4"
      style={shadow ? cardShadowStyle : {}}
    >
      <div className="flex items-start gap-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-sm uppercase">{delivery.type}</h4>
            <Badge
              className="font-semibold"
              variant={getStatusColor(delivery.status)}
            >
              {delivery.status.toUpperCase().split("_").join(" ")}
            </Badge>
          </div>
          <div>
            <p className="line-clamp-1 text-muted-foreground text-sm">
              {delivery.address}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Client>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {formatDate(delivery.date)}
                </span>
              </Client>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Link
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "px-0 text-sm uppercase"
          )}
          href={`/customer-orders/${delivery.orderId}`}
        >
          {delivery.orderId}
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }))}
          href={`/customer-deliveries/${delivery.id}`}
        >
          View Delivery
        </Link>
      </div>
    </div>
  );
}
