import { ArrowDownCircle, ArrowUpCircle, MapPin, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { RequestDeliverySection } from "@/components/features/customer-orders/request-delivery-section";
import { CustomerOrderAddressProvider } from "@/components/features/customer-orders/state";
import { Badge } from "@/components/ui/badge";
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
          <CustomerOrderAddressProvider>
            <RequestDeliverySection
              hasExistingDeliveries={deliveries.length > 0}
              isReady={status === "ready"}
              labels={{
                readyForDelivery: t("readyForDelivery"),
                homeDelivery: t("homeDelivery"),
                readyForDeliveryDescription: t("readyForDeliveryDescription"),
                homeDeliveryDescription: t("homeDeliveryDescription"),
                requestDelivery: t("requestDelivery"),
                confirmAddress: t("confirmAddress"),
                cancel: t("cancel"),
              }}
            />
          </CustomerOrderAddressProvider>
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
