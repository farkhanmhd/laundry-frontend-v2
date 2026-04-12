import { ArrowDownCircle, ArrowUpCircle, MapPin, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CustomerOrdersApi } from "@/lib/modules/customer-orders/data";
import { cardShadowStyle } from "@/lib/utils";

type OrderDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailDeliveries({
  params,
}: OrderDetailProps) {
  const { id } = await params;
  const t = await getTranslations("CustomerOrders.orderDetail");
  const [deliveries, detail, payment] = await Promise.all([
    CustomerOrdersApi.getCustomerOrderDelivery(id),
    CustomerOrdersApi.getCustomerOrderDetail(id),
    CustomerOrdersApi.getCustomerOrderPayment(id),
  ]);

  const status = detail.status;
  const hasDeliveryRequest = deliveries.some((d) => d.type === "delivery");
  const canRequestDelivery =
    !hasDeliveryRequest &&
    (status === "ready" || status === "processing") &&
    payment.status === "settlement";

  return (
    <Card style={cardShadowStyle}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
          <Truck className="h-4 w-4 text-muted-foreground" />
          {t("deliveryDetails")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {deliveries.length > 0 && (
          <div className="space-y-6">
            {deliveries.map((delivery, index) => (
              <div key={delivery.id}>
                {index > 0 && <Separator className="mb-4 bg-border" />}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {delivery.type === "pickup" ? (
                        <ArrowDownCircle className="h-4 w-4 text-chart-2" />
                      ) : (
                        <ArrowUpCircle className="h-4 w-4 text-primary" />
                      )}
                      <span className="font-semibold text-foreground text-sm capitalize">
                        {delivery.type === "pickup"
                          ? t("pickUp")
                          : t("delivery")}
                      </span>
                    </div>
                    <Badge
                      className="bg-secondary text-secondary-foreground text-xs uppercase"
                      variant="secondary"
                    >
                      {delivery.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {delivery.label || t("address")}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {delivery.address}
                      </p>
                      {delivery.notes && (
                        <p className="mt-1 text-muted-foreground text-xs italic">
                          {t("note")}: "{delivery.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {canRequestDelivery && (
          <>
            {deliveries.length > 0 && <Separator className="bg-border" />}
            <div className="flex flex-col items-center justify-center space-y-4 py-2 text-center">
              {deliveries.length === 0 && (
                <div className="rounded-full bg-secondary/50 p-4">
                  <Truck className="h-8 w-8 text-muted-foreground/50" />
                </div>
              )}
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {status === "ready"
                    ? t("readyForDelivery")
                    : t("homeDelivery")}
                </p>
                <p className="mx-auto max-w-xs text-muted-foreground text-sm">
                  {status === "ready"
                    ? t("readyForDeliveryDescription")
                    : t("homeDeliveryDescription")}
                </p>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {t("requestDelivery")}
              </Button>
            </div>
          </>
        )}
        {deliveries.length === 0 && (
          <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
            <div className="rounded-full bg-secondary/50 p-4">
              <Truck className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                {t("noDeliveryDetails")}
              </p>
              <p className="mx-auto max-w-xs text-muted-foreground text-sm">
                {t("noDeliveryServices")}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
