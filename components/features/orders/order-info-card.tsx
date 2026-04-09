"use client";

import { LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAlertDialog } from "@/components/providers/alert-dialog-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/components/utils/client";
import type { OrderDelivery } from "@/lib/modules/orders/data";
import { cardShadowStyle, cn, formatDate, getStatusColor } from "@/lib/utils";
import type { UpdateOrderStatusData } from "./update-status-dialog";

interface OrderInfoProps {
  id: string;
  deliveries: OrderDelivery[];
  data: {
    status: "pending" | "processing" | "ready" | "completed" | "cancelled";
    createdAt: string;
  };
}

export const OrderInfoCard = ({ id, data, deliveries }: OrderInfoProps) => {
  const t = useTranslations("Orders.orderInfo");
  const { setData, onOpenChange } = useAlertDialog<UpdateOrderStatusData>();

  const handleStatusUpdate = (
    newStatus: UpdateOrderStatusData["newStatus"]
  ) => {
    setData({
      orderId: id,
      newStatus,
    });
    onOpenChange(true);
  };

  const needDelivery = deliveries.some((d) => d.type === "delivery");

  const orderStatus = {
    cancelled: <Badge variant="destructive">{t("cancelled")}</Badge>,
    pending: <Badge variant="destructive">{t("waitingForPayment")}</Badge>,
    processing: (
      <Button onClick={() => handleStatusUpdate("ready")}>
        {t("markAsReady")}
      </Button>
    ),
    ready: (
      <Button
        disabled={needDelivery}
        onClick={() => handleStatusUpdate("completed")}
      >
        {t("markAsCompleted")}
      </Button>
    ),
    completed: <Badge>{t("completed")}</Badge>,
  };

  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 font-semibold text-base">
          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          {t("orderInformation")}
        </CardTitle>
        {orderStatus[data.status as keyof typeof orderStatus]}
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">{t("orderId")}</span>
          <span className="font-medium font-mono text-foreground text-sm">
            #{id.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">{t("status")}</span>
          <div>
            <Badge
              className={cn(
                "px-2 py-0.5 text-[10px] uppercase shadow-none",
                getStatusColor(data.status)
              )}
              variant="outline"
            >
              {data.status}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">
            {t("createdAt")}
          </span>
          <span className="font-medium text-foreground text-sm">
            <Client>{formatDate(data.createdAt)}</Client>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
