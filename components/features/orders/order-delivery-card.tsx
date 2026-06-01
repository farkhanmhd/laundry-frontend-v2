import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Bike,
  MapPinOff,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { OrderDelivery } from "@/lib/modules/orders/data";
import { cardShadowStyle } from "@/lib/utils";
import { useOrderDetail } from "./order-detail-context";

type DeliveryStatus = OrderDelivery["status"];

export const OrderDeliveryCard = () => {
  const t = useTranslations("Orders.delivery");
  const { deliveries } = useOrderDetail();
  const sortedDeliveries = [...(deliveries || [])]
    .sort((a) => (a.type === "pickup" ? -1 : 1))
    .slice(0, 2);

  const deliveryStatusBadge: Record<DeliveryStatus, React.ReactNode> = {
    requested: <Badge variant="secondary">{t("requested")}</Badge>,
    in_progress: <Badge variant="default">{t("in_progress")}</Badge>,
    picked_up: <Badge>{t("picked_up")}</Badge>,
    completed: <Badge>{t("completed")}</Badge>,
    cancelled: <Badge variant="destructive">{t("cancelled")}</Badge>,
  };

  return (
    <Card className="w-full" style={cardShadowStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 font-semibold text-base">
          <Bike className="h-4 w-4 text-muted-foreground" />
          {t("logistics")}
        </CardTitle>
        {sortedDeliveries.length > 0 && (
          <Badge
            className="font-normal text-muted-foreground"
            variant="outline"
          >
            {t("legs", { count: sortedDeliveries.length })}
          </Badge>
        )}
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent>
        {sortedDeliveries.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-6 text-center text-muted-foreground">
            <MapPinOff className="h-8 w-8 opacity-50" />
            <div className="font-medium text-sm">{t("noDeliveryInfo")}</div>
            <p className="max-w-50 text-xs leading-snug opacity-70">
              {t("noDeliveryDescription")}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {sortedDeliveries.map((item, index) => (
              <div className="relative" key={item.id}>
                {index > 0 && <Separator className="absolute -top-3 mb-6" />}

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center font-medium text-foreground text-sm capitalize">
                    {item.type === "pickup" ? (
                      <ArrowUpFromLine className="mr-2 h-3.5 w-3.5 text-orange-500" />
                    ) : (
                      <ArrowDownToLine className="mr-2 h-3.5 w-3.5 text-blue-500" />
                    )}
                    {item.type}
                  </div>

                  {deliveryStatusBadge[item.status]}
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-sm">
                      {t("locationLabel")}
                    </span>
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-sm">
                      {t("address")}
                    </span>
                    <span className="text-foreground text-sm leading-snug">
                      {item.address}
                    </span>
                  </div>

                  {item.note && (
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground text-sm">
                        {t("note")}
                      </span>
                      <div className="rounded-sm bg-muted px-3 py-2 text-foreground/90 text-sm italic leading-relaxed dark:bg-accent">
                        &quot;{item.note}&quot;
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
