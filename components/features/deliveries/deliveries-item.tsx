import { ChevronRight, Clock, Truck } from "lucide-react";
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
          <Truck className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold uppercase">{delivery.type} Request</h4>
            <Badge
              className="font-semibold"
              variant={getStatusColor(delivery.status)}
            >
              {delivery.status.toUpperCase().split("_").join(" ")}
            </Badge>
          </div>
          <p className="line-clamp-1 text-muted-foreground text-sm">
            {delivery.address}
          </p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "px-0 uppercase"
              )}
              href={`/customer/orders/${delivery.orderId}`}
            >
              {delivery.orderId}
            </Link>
            <Client>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {formatDate(delivery.date)}
              </span>
            </Client>
          </div>
        </div>
      </div>
      <Link
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "self-end sm:self-center"
        )}
        href={`/customer-deliveries/${delivery.id}`}
      >
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </div>
  );
}
