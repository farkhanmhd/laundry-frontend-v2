import { Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/components/utils/client";
import { CustomerOrdersApi } from "@/lib/modules/customer-orders/data";
import { cardShadowStyle, formatDate } from "@/lib/utils";

type OrderDetailProps = {
  params: Promise<{ id: string }>;
};

type OrderStatus = "pending" | "processing" | "ready" | "completed" | "cancelled";

const OrderStatusBadge = ({
  status,
  t,
}: {
  status: OrderStatus;
  t: (key: string) => string;
}) => {
  const config: Record<
    OrderStatus,
    {
      label: string;
      variant: "destructive" | "outline" | "secondary" | "default";
    }
  > = {
    pending: {
      label: t("paymentRequired"),
      variant: "destructive",
    },
    processing: {
      label: t("processing"),
      variant: "outline",
    },
    ready: {
      label: t("ready"),
      variant: "secondary",
    },
    cancelled: {
      label: t("cancelled"),
      variant: "outline",
    },
    completed: {
      label: t("completed"),
      variant: "default",
    },
  };

  const { label, variant } = config[status] || config.pending;

  return (
    <Badge
      className="font-semibold text-xs uppercase"
      style={cardShadowStyle}
      variant={variant}
    >
      {label}
    </Badge>
  );
};

export default async function OrderDetailHeader({ params }: OrderDetailProps) {
  const { id } = await params;
  const t = await getTranslations("CustomerOrders.orderDetail");
  const detail = await CustomerOrdersApi.getCustomerOrderDetail(id);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-foreground text-xl uppercase tracking-tight">
          {t("orderItems")} {id}
        </h1>
        <OrderStatusBadge status={detail.status} t={t} />
      </div>
      <Client>
        <p className="mt-1 flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar className="h-4 w-4" />
          {formatDate(detail.createdAt)}
        </p>
      </Client>
    </div>
  );
}
