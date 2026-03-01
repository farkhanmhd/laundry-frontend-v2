import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Client } from "@/components/utils/client";
import type { CustomerOrder } from "@/hooks/use-customer-orders";
import {
  cardShadowStyle,
  cn,
  formatDate,
  formatToIDR,
  getStatusColor,
} from "@/lib/utils";

type Props = {
  order: CustomerOrder;
  shadow?: boolean;
};

export function OrderListItem({ order, shadow = false }: Props) {
  const t = useTranslations("CustomerOrders");

  return (
    <div
      className="space-y-3 rounded-md border p-3"
      style={shadow ? cardShadowStyle : {}}
    >
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold uppercase">
            {t("order")} {order.id}
          </p>
          <Badge
            className="font-semibold"
            variant={getStatusColor(order.status)}
          >
            {t(`status.${order.status}`)}
          </Badge>
        </div>
        <Client>
          <p className="mt-1 text-muted-foreground text-sm">
            {formatDate(order.createdAt)}
          </p>
        </Client>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-bold">{formatToIDR(order.total ?? 0)}</p>
        <div className="flex items-center justify-between gap-2">
          <Link
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
            href={`/customer-orders/${order.id}`}
          >
            {t("details")}
          </Link>
          {order.status === "pending" && (
            <Link
              className={cn(buttonVariants({ size: "sm" }))}
              href={`/customer-orders/${order.id}/payment`}
            >
              {t("payNow")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
